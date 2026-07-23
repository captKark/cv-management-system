const express = require("express");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.post("/login", authController.login);
router.get("/me", authenticate, authorize("admin"), (req, res) => {
  res.json(req.user);
});
module.exports = router;
