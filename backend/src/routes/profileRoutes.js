const express = require("express");

const { getProfile } = require("../controllers/profileController");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get(
  "/",
  authenticate,
  getProfile,
);

module.exports = router;