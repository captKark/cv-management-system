const express = require("express");

const {
  getAllCVs,
  createCV,
  updateCV,
  deleteCVs,
  updateAttributeValues,
} = require("../controllers/cvsController");

const router = express.Router();

router.get("/", getAllCVs);
router.post("/", createCV);
router.put("/:id", updateCV);
router.put("/:id/attributes", updateAttributeValues);
router.delete("/", deleteCVs);
module.exports = router;
