const express = require("express");
const router = express.Router();

const positionsController = require("../controllers/positionsController");
const positionAttributeController = require("../controllers/positionAttributeController");

router.get("/", positionsController.getAllPositions);
router.post("/", positionsController.createPosition);
router.post("/:id/duplicate", positionsController.duplicatePosition);
router.put("/:id", positionsController.updatePosition);
router.delete("/", positionsController.deletePositions);
router.get(
  "/:id/attributes",
  positionAttributeController.getPositionAttributes,
);
router.get("/:id/template", positionsController.getPositionTemplate);
router.put(
  "/:id/attributes",
  positionAttributeController.updatePositionAttributes,
);
module.exports = router;
