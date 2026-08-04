const profileService = require("../services/profileService");

const getProfile = async (req, res) => {
  const profile = await profileService.getProfile(req.user.id);

  if (!profile) {
    return res.status(404).json({
      message: "Profile not found.",
    });
  }

  res.status(200).json(profile);
};

module.exports = {
  getProfile,
};