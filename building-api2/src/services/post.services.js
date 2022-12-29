const { postRepository } = require("../repository/");
const Joi = require("joi");

exports.validateInput = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    data: Joi.string().required(),
    userID: Joi.number().required(),
  });

  const { error } = schema.validateAsync(data);

  if (error) {
    throw `Error ${error}`;
  }

  return data;
};
