const { userServices } = require("../services/");
const { userRepository } = require("../repository/");
const { authHelper } = require("../helper");

exports.signup = async (req, res) => {
  try {
    data = req.body;
    await userServices.validateInput(data);
    const result = await userServices.createUser(data);
    const token = authHelper.sign(result.uuid);

    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email or password cannot be empty");
    }

    const user = await userRepository.findByEmail(email);
    const userPassword = user?.password || "anu";
    const validPass = await userServices.validatePassword(
      password,
      userPassword
    );

    if (!user || !validPass) {
      throw new Error("Incorrect user or password");
    }

    const token = authHelper.sign(user.uuid);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: "Success",
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
      errors: err,
    });
  }
};

exports.isLogedIn = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not loged in");
      //   return;
    }

    const decoded = await authHelper.verify(token);
    const userInfo = await userRepository.getByUuid(decoded.uuid);
    if (!userInfo) {
      throw new Error("Sessions expired! please login again!");
    }

    req.body.userInfo = userInfo.dataValues;

    next();
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
      errors: err,
    });
  }
};

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.body.userInfo.role)) {
        throw new Error("You don't have permission to access this resources");
      }
      next();
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
        errors: err,
      });
    }
  };
};
