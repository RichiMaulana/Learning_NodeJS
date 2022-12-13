'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class toursModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  toursModels.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        notNull: true,
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
      price: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      tableName: 'tours',
      modelName: 'toursModel',
    }
  );
  return toursModels;
};
