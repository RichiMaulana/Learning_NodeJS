const app = require("./app");
require("dotenv").config();
const { sequelize } = require("./src/models");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listening on port", port);
  sequelize.authenticate();
});
