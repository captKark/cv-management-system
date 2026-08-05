const express = require("express");

const authenticate = require("../middleware/authenticate");
const powerAutomateController = require("../controllers/powerAutomateController");

const router = express.Router();

router.post(
  "/export",
  authenticate,
  powerAutomateController.exportToPowerAutomate,
);

module.exports = router;