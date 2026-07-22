const express = require("express");

const router = express.Router();

const attributeController = require("../controllers/attributeController");

router.get("/", attributeController.getAllAttributes);

router.post("/", attributeController.createAttribute);

router.put("/:id", attributeController.updateAttribute);

router.delete("/", attributeController.deleteAttributes);

module.exports = router;