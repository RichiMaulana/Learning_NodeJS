const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authController = require("../controller/authController");

router
  .route("/")
  .get(authController.isLogedIn, postController.getAllPosts)
  .post(authController.isLogedIn, postController.createPost);

module.exports = router;
