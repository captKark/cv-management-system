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
router.get(
  "/",
  authenticate,
  authorize("admin", "recruiter", "candidate"),
  getAllCVs,
);
router.post("/", authenticate, authorize("admin", "candidate"), createCV);
router.put("/:id", authenticate, authorize("admin", "candidate"), updateCV);
router.put(
  "/:id/attributes",
  authenticate,
  authorize("admin", "candidate"),
  updateAttributeValues,
);
router.delete("/", authenticate, authorize("admin"), deleteCVs);

module.exports = router;
