const express = require("express");
const router = express.Router();

const positionsController = require("../controllers/positionsController");

router.get("/", positionsController.getAllPositions);
router.post("/", positionsController.createPosition);
router.put("/:id", positionsController.updatePosition);
router.delete("/", positionsController.deletePositions);

module.exports = router;    