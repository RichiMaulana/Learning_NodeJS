const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const tokenExpiry = process.env.JWT_EXPIRES_IN;

exports.sign = (uuid) => {
  return jwt.sign({ uuid: uuid }, secret, {
    expiresIn: tokenExpiry,
  });
};

exports.verify = (token) => {
  return promisify(jwt.verify)(token, secret);
};
