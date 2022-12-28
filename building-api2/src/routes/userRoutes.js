const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/").get(userController.getAllUser);
router.route("/:uuid").get(userController.getUserByUuid);
router.route("/signup").post(userController.createUser);

module.exports = router;
