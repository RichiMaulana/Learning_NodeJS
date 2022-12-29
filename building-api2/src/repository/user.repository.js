const Sequelize = require("sequelize");
const { Users, Posts } = require("../models");

exports.createUsers = async (data) => {
  const create = await Users.create(data);
  return create;
};

exports.getAllUsers = async () => {
  const result = await Users.findAll({
    order: [["createdAt", "desc"]],
    attributes: ["uuid", "name", "email", "status", "createdAt", "updatedAt"],
    include: {
      model: Posts,
      attributes: ["uuid", "name", "data", "createdAt", "updatedAt"],
    },
  });
  return result;
};

exports.getByUuid = (uuid) => {
  const result = Users.findOne({
    where: { uuid: uuid },
    attributes: ["uuid", "name", "email", "id"],
  });
  return result;
};

exports.findByEmail = (email) => {
  const result = Users.findOne({
    where: { email: email },
  });
  return result;
};
