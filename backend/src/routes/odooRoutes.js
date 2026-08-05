const express = require("express");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const {
  exportToOdoo,
} = require("../controllers/odooController");

const router = express.Router();

router.post(
  "/export",
  authenticate,
  authorize("admin", "candidate"),
  exportToOdoo,
);

module.exports = router;  