const { userServices } = require("../services/");
// const { userRepository } = require("../repository/");
// const { authHelper } = require("../helper");

exports.getAllUser = async (req, res) => {
  try {
    const query = await userServices.getAllUser();
    res.status(200).json({
      status: "Success",
      message: "Successfully get all users",
      data: query,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: err,
    });
  }
};

exports.getUserByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;
    const query = await userServices.getUserByUuid(uuid);
    res.status(200).json({
      status: "Success",
      message: "Successfully get users",
      data: query,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: err,
    });
  }
};
