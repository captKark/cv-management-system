const salesforceService = require("../services/salesforceService");
const profileService = require("../services/profileService");

const startOAuth = async (req, res) => {
  try {
    const { company, phone } = req.body;

    if (!company?.trim()) {
      return res.status(400).json({
        message: "Company is required.",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        message: "Phone is required.",
      });
    }

    const authorizationUrl = salesforceService.generateAuthorizationUrl(
      req.user.id,
      {
        company: company.trim(),
        phone: phone.trim(),
      },
    );

    res.status(200).json({
      authorizationUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to start Salesforce authentication.",
    });
  }
};

const callback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.redirect("http://localhost:5173/profile?salesforce=failed");
    }

    const session = await salesforceService.exchangeCodeForToken(code, state);

    const profile = await profileService.getProfile(session.userId);

    if (!profile) {
      return res.redirect("http://localhost:5173/profile?salesforce=failed");
    }

    const nameParts = profile.name.trim().split(/\s+/);

    const firstName = nameParts.shift() || "";

    const lastName = nameParts.join(" ") || ".";

    const accountId = await salesforceService.createAccount(
      session.accessToken,
      session.instanceUrl,
      {
        company: session.payload.company,
      },
    );

    const existingContact = await salesforceService.findContactByEmail(
      session.accessToken,
      session.instanceUrl,
      profile.email,
    );

    if (existingContact) {
      await salesforceService.updateContact(
        session.accessToken,
        session.instanceUrl,
        existingContact.Id,
        {
          firstName,
          lastName,
          phone: session.payload.phone,
        },
      );
    } else {
      await salesforceService.createContact(
        session.accessToken,
        session.instanceUrl,
        accountId,
        {
          firstName,
          lastName,
          email: profile.email,
          phone: session.payload.phone,
        },
      );
    }

    return res.redirect("http://localhost:5173/profile?salesforce=success");
  } catch (error) {
    console.error("========== SALESFORCE CALLBACK ==========");
    console.error(error);

    if (error.response) {
      console.error(error.response.data);
    }

    return res.status(500).json({
      message: error.message,
      details: error.response?.data,
    });
  }
};

module.exports = {
  startOAuth,
  callback,
};
