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
      // this.hasMany(models.tourDate, { foreignKey: 'tourId' });
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
      durationWeeks: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.duration / 7}`;
        },
        set(value) {
          throw new Error('Do not try to set the `durationWeeks` value!');
        },
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
