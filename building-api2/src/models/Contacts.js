"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contacts.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        notNull: true,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      phone: {
        type: DataTypes.INTEGER,
      },
      role: DataTypes.ENUM(["primary", "it", "accounting"]),
      status: {
        type: DataTypes.ENUM(["active", "inactive", "closed"]),
      },
    },
    {
      sequelize,
      modelName: "Contacts",
    }
  );
  return contacts;
};
