const express = require("express");
const app = express();
const mainRouter = require("./src/routes");

app.use(express.json());

app.use("/api/v1/", mainRouter);

module.exports = app;
