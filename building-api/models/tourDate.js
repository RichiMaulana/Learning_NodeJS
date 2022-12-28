'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tourDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.toursModels, { foreignKey: 'id' });
    }
  }
  tourDate.init(
    {
      startDates: DataTypes.DATE,
      tourId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'tourDate',
    }
  );
  return tourDate;
};
