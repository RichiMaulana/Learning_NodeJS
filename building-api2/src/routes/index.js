const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

router.route("/").get((req, res) => {
  res.send(req.body);
});

router.use("/user", userRoutes);
router.use("/post", postRoutes);
module.exports = router;
