const profileService = require("../services/profileService");
const odooService = require("../services/odooService");

const exportToOdoo = async (req, res) => {
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

    const profile = await profileService.getProfile(req.user.id);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    await odooService.exportCandidate({
      name: profile.name,
      email: profile.email,
      company: company.trim(),
      phone: phone.trim(),
    });

    res.status(200).json({
      message: "Successfully exported to Odoo.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to export to Odoo.",
    });
  }
};

module.exports = {
  exportToOdoo,
};