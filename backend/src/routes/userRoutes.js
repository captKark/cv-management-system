const express = require("express");

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  userController.getUsers,
);

module.exports = router;