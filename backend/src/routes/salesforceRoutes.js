const express = require("express");

const authenticate = require("../middleware/authenticate");
const authenticateRedirect = require("../middleware/authenticateRedirect");
const authorize = require("../middleware/authorize");

const {
  startOAuth,
  callback,
} = require("../controllers/salesforceController");

const router = express.Router();

router.post(
  "/start",
  authenticate,
  authorize("admin", "candidate"),
  startOAuth,
);

router.get(
  "/callback",
  callback,
);

module.exports = router;