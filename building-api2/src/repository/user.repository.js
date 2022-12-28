const Sequelize = require("sequelize");
const { Users } = require("../models");

exports.createUsers = async (data) => {
  const create = await Users.create(data);
  return create;
};

exports.getAllUsers = async () => {
  const result = await Users.findAll({
    order: [["createdAt", "desc"]],
    attributes: {},
  });
  return result;
};

exports.getByUuid = (uuid) => {
  const result = Users.findOne({
    where: { uuid: uuid },
  });
  return result;
};
