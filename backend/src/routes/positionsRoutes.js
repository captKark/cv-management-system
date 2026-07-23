const express = require("express");
const router = express.Router();

const positionsController = require("../controllers/positionsController");
const positionAttributeController = require("../controllers/positionAttributeController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// View positions
router.get(
  "/",
  authenticate,
  authorize("admin", "recruiter", "candidate"),
  positionsController.getAllPositions,
);

// Create position
router.post(
  "/",
  authenticate,
  authorize("admin", "recruiter"),
  positionsController.createPosition,
);

// Duplicate position
router.post(
  "/:id/duplicate",
  authenticate,
  authorize("admin", "recruiter"),
  positionsController.duplicatePosition,
);

// Update position
router.put(
  "/:id",
  authenticate,
  authorize("admin", "recruiter"),
  positionsController.updatePosition,
);

// Delete position
router.delete(
  "/",
  authenticate,
  authorize("admin"),
  positionsController.deletePositions,
);

// View assigned attributes
router.get(
  "/:id/attributes",
  authenticate,
  authorize("admin", "recruiter", "candidate"),
  positionAttributeController.getPositionAttributes,
);

// View position template
router.get(
  "/:id/template",
  authenticate,
  authorize("admin", "recruiter", "candidate"),
  positionsController.getPositionTemplate,
);

// Assign/update attributes
router.put(
  "/:id/attributes",
  authenticate,
  authorize("admin", "recruiter"),
  positionAttributeController.updatePositionAttributes,
);

module.exports = router;