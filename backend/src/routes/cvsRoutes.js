const express = require("express");

const {
  getAllCVs,
  createCV,
  updateCV,
  deleteCVs,
} = require("../controllers/cvsController");

const router = express.Router();

router.get("/", getAllCVs);
router.post("/", createCV);
router.put("/:id", updateCV);
router.delete("/", deleteCVs);
module.exports = router;