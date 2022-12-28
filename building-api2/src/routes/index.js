const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const userController = require("../controller/userController");

router.route("/").get((req, res) => {
  res.send(req.body);
});

router.use("/user", userRoutes);
module.exports = router;
