const { userServices } = require("../services/");

exports.createUser = async (req, res) => {
  try {
    data = req.body;
    await userServices.validateInput(data);
    const result = await userServices.createUser(data);

    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: err,
    });
  }
};

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
