const authService = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(
    email,
    password,
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  res.status(200).json(user);
};
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch current user.",
    });
  }
};

module.exports = {
  login,
  register,
  getCurrentUser,
};