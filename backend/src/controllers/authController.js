const authService = require("../services/authService");

const login = (req, res) => {
  const { email, password } = req.body;

  const user = authService.login(email, password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  res.status(200).json(user);
};

module.exports = {
  login,
};