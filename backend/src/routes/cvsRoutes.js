const express = require("express");

const {
  getAllCVs,
  createCV,
  updateCV,
  deleteCVs,
  updateAttributeValues,
} = require("../controllers/cvsController");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

// View CVs
router.get(
  "/",
  authenticate,
  authorize("admin", "recruiter", "candidate"),
  getAllCVs,
);

// Create CV
router.post("/", authenticate, authorize("admin", "candidate"), createCV);

// Update CV
router.put("/:id", authenticate, authorize("admin", "candidate"), updateCV);

// Update generated attribute values
router.put(
  "/:id/attributes",
  authenticate,
  authorize("admin", "candidate"),
  updateAttributeValues,
);

// Delete CV
router.delete("/", authenticate, authorize("admin"), deleteCVs);

module.exports = router;
