const express = require("express");
const app = express();
const mainRouter = require("./src/routes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many request from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use("/api/v1/", mainRouter);

module.exports = app;
