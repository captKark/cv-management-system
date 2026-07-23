const express = require("express");

const router = express.Router();

const attributeController = require("../controllers/attributeController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.get(
  "/",
  authenticate,
  authorize("admin", "recruiter", "candidate"),
  attributeController.getAllAttributes,
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  attributeController.createAttribute,
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  attributeController.updateAttribute,
);

router.delete(
  "/",
  authenticate,
  authorize("admin"),
  attributeController.deleteAttributes,
);

module.exports = router;