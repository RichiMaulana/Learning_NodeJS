const express = require("express");
const app = express();
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const mainRouter = require("./src/routes");
const { sequelize } = require("./src/models");
const authRoute = require("./src/routes/authRoute");
const passport = require("./src/services/passport");

const myStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "keryboard cat",
    store: myStore,
    resave: false,
    proxy: false,
    saveUninitialized: false,
  })
);

myStore.sync();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use("/api/v1/", mainRouter);

module.exports = app;
