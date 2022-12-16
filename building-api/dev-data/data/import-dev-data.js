// const { Op } = require('sequelize');
const fs = require('fs');
const { sequelize, toursModel, Sequelize } = require('../../models');

const { Op } = Sequelize;

sequelize.authenticate().then(() => console.log('database authenticated'));

// OK
// toursModel.findAll().then((data) => console.log(data));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

const importData = async () => {
  try {
    await toursModel.bulkCreate(tours);
    console.log('All data successfully imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await toursModel.truncate();
    console.log('All data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

const queryKu = async () => {
  try {
    const queryAllResult = await toursModel.findAll({
      where: {
        duration: {
          $gt: 12,
        },
      },
    });
    console.log(queryAllResult);
  } catch (err) {
    console.log(err.message);
  }
};
