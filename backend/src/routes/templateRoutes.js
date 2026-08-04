const express = require("express");

const templateController = require("../controllers/templateController");

const authenticate = require("../middleware/authenticate");

const authorize = require("../middleware/authorize");

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  authorize("admin", "recruiter"),
  templateController.getTemplates,
);

router.get(
  "/:id",
  authorize("admin", "recruiter"),
  templateController.getTemplateById,
);

router.post("/", authorize("admin"), templateController.createTemplate);

router.put("/:id", authorize("admin"), templateController.updateTemplate);
router.post(
  "/:id/generate-position",
  authorize("admin", "recruiter"),
  templateController.generatePosition,
);
router.delete("/", authorize("admin"), templateController.deleteTemplates);

module.exports = router;
