"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("contacts", {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contacts");
  },
};
