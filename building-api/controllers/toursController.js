// Using sequelize and PostgreSQL

const { toursModel, Sequelize } = require('../models');

const { fn, col, ARRAY } = Sequelize;

const APIFeature = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.page = '1';
  req.query.sort = 'ratingsAverage';
  next();
};

exports.checkId = async (req, res, next, val) => {
  const checking = await toursModel.findOne({ where: { uuid: val } });

  if (!checking) {
    return res.status(404).json({
      status: 'Request failed',
      message: 'Invalid ID',
    });
  }
  next();
};

// exports.checkBody = (req, res, next) => {
//   // const data = req.body;

//   // if (!data.name || !data.price) {
//   //   return res.status(400).json({
//   //     status: 'Bad Request',
//   //     message:
//   //       'Request body does not meet the minimum requirements, Name or Price',
//   //   });
//   // }
//   next();
// };

exports.getAllTours = catchAsync(async (req, res, next) => {
  const query = new APIFeature(req.query).query();
  const filter = new APIFeature(req.query).filter();
  console.log({ ...query, ...filter });

  const tours = await toursModel.findAll({ ...query, ...filter });

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { uuid } = req.params;

  const tour = await toursModel.findOne({ where: { uuid: uuid } });

  if (!tour) {
    return next(new AppError('No tour found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const tour = await toursModel.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      tour: tour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const uuid = req.params;

  // const {
  //   name,
  //   duration,
  //   description,
  //   maxGroupSize,
  //   difficulty,
  //   ratingsAverage,
  //   ratingsQuantity,
  //   price,
  //   summary,
  //   imageCover,
  //   images,
  //   startDates,
  // } = req.body;

  const tourUpdated = await toursModel.update(req.body, {
    where: uuid,
  });

  if (!tourUpdated) {
    return next(new AppError('No tour found with that id', 404));
  }

  res.status(200).json({
    status: 'Success',
    message: 'Tours Updated!',
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const { uuid } = req.params;

  const tourDeleted = await toursModel.destroy({
    where: { uuid },
  });

  if (!tourDeleted) {
    return next(new AppError('No tour found with that id', 404));
  }

  res.status(200).json({
    status: 'Success',
    message: `Tour ${uuid} was successfully deleted`,
  });
});

exports.getToursStats = catchAsync(async (req, res, next) => {
  const stats = await toursModel.findAll({
    group: 'difficulty',
    attributes: [
      [fn('UPPER', col('difficulty')), 'difficulty'],
      [fn('AVG', col('ratingsAverage')), 'avgRatting'],
      [fn('SUM', 1), 'numTours'],
      [fn('SUM', col('ratingsQuantity')), 'numRattings'],
      [fn('AVG', col('price')), 'avgPrice'],
      [fn('MIN', col('price')), 'minPrice'],
      [fn('MAX', col('price')), 'maxPrice'],
    ],
    order: [['avgPrice', 'asc']],
  });

  res.status(201).json({
    status: 'Success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const { year } = req.params;

  const plan = await toursModel.findAll();

  res.status(201).json({
    status: 'Success',
    result: plan.length,
    data: {
      plan,
    },
  });
});
