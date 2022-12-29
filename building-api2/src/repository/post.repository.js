const Sequelize = require("sequelize");
const { Posts, Users } = require("../models");

exports.createPost = async (data) => {
  const create = await Posts.create(data);
  return create;
};

exports.getAllPosts = async (userId) => {
  const result = await Posts.findAll({
    order: [["createdAt", "desc"]],
    include: {
      model: Users,
      as: "Author",
      attributes: ["name", "email"],
    },
    attributes: ["uuid", "name", "data"],
    where: {
      userID: userId,
    },
  });
  return result;
};

exports.getByUuid = (uuid) => {
  const result = Users.findOne({
    where: { uuid: uuid },
  });
  return result;
};

exports.findByEmail = (email) => {
  const result = Users.findOne({
    where: { email: email },
  });
  return result;
};
