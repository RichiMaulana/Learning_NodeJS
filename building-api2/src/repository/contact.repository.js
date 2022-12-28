const Sequelize = require("sequelize");
const { Contacts } = require("../models");

exports.createContacts = async (data) => {
  const create = await Contacts.create(data);
  return create;
};

exports.getAllContacts = async (query) => {};
