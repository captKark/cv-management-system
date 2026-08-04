const express = require("express");

const profileController = require("../controllers/profileController");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get(
  "/",
  authenticate,
  profileController.getProfile,
);

module.exports = router;