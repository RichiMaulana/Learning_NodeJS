const { userRepository } = require("../repository/");
const Joi = require("joi");
const bcrypt = require("bcrypt");

exports.getAllUser = () => {
  const queryResult = userRepository.getAllUsers();
  return queryResult;
};

exports.getUserByUuid = (uuid) => {
  const queryResult = userRepository.getByUuid(uuid);
  return queryResult;
};

exports.validateInput = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}/[\]|\\:;"'<>,.?/_₹]).{8,}$/
        )
      )
      .required(),
    status: Joi.string().valid("active", "trashed"),
  });

  const { error } = await schema.validateAsync(data);

  if (error) {
    throw `Error ${error}`;
  }

  return data;
};

exports.createUser = (data) => {
  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    status: data.status ? data.status : "active",
  };
  const create = userRepository.createUsers(userData);
  return create;
};

exports.validatePassword = (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};
