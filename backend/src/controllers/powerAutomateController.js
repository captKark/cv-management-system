const profileService = require("../services/profileService");
const powerAutomateService = require("../services/powerAutomateService");

const exportToPowerAutomate = async (req, res) => {
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

    const result = await powerAutomateService.exportCandidate({
      name: profile.name,
      email: profile.email,
      phone: phone.trim(),
      company: company.trim(),
      exportedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      message: "Successfully exported to Power Automate.",
      fileName: result.fileName,
      driveFileId: result.driveFileId,
    });
  } catch (error) {
    console.error("POWER AUTOMATE EXPORT ERROR:");
    console.error(error.stack || error);

    res.status(500).json({
      message: "Failed to export to Power Automate.",
      error: error.message,
    });
  }
};

module.exports = {
  exportToPowerAutomate,
};
