const jwt = require("jsonwebtoken");

const authenticateRedirect = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authenticateRedirect;