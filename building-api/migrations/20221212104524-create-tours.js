'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tours', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        notNull: true,
        unique: true,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        notNull: true,
      },
      duration: DataTypes.INTEGER,
      maxGroupSize: DataTypes.INTEGER,
      difficulty: {
        type: DataTypes.STRING,
      },
      ratingsAverage: DataTypes.FLOAT,
      ratingsQuantity: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      imageCover: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      startDates: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        notNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tours');
  },
};
