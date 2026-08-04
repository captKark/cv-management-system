const express = require("express");

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/", userController.getUsers);

router.patch("/activate", userController.activateUsers);

router.patch("/deactivate", userController.deactivateUsers);
router.patch("/reset-password",userController.resetPassword);

router.post("/recruiters", userController.createRecruiter);

module.exports = router;
