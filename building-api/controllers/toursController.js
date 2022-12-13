// Using sequelize and PostgreSQL

const { toursModel } = require('../models');

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

exports.checkBody = (req, res, next) => {
  // const data = req.body;

  // if (!data.name || !data.price) {
  //   return res.status(400).json({
  //     status: 'Bad Request',
  //     message:
  //       'Request body does not meet the minimum requirements, Name or Price',
  //   });
  // }
  next();
};

exports.getAllTours = async (req, res) => {
  const tours = await toursModel.findAll();

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = async (req, res) => {
  const { uuid } = req.params;

  try {
    const tour = await toursModel.findOne({ where: { uuid: uuid } });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  const {
    name,
    duration,
    description,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    price,
    summary,
    imageCover,
    images,
    startDates,
  } = req.body;

  try {
    const tour = await toursModel.create({
      name,
      duration,
      description,
      maxGroupSize,
      difficulty,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      imageCover,
      images,
      startDates,
    });

    console.log(tour);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  const { uuid } = req.params;

  const {
    name,
    duration,
    description,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    price,
    summary,
    imageCover,
    images,
    startDates,
  } = req.body;

  try {
    await toursModel.update(
      {
        name,
        duration,
        description,
        maxGroupSize,
        difficulty,
        ratingsAverage,
        ratingsQuantity,
        price,
        summary,
        imageCover,
        images,
        startDates,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    res.status(200).json({
      status: 'Success',
      message: 'Tours Updated!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.deleteTour = (req, res) => {
  const { uuid } = req.params;
  try {
    toursModel.destroy({
      where: { uuid },
    });

    res.status(200).json({
      status: 'Success',
      message: `Tour ${uuid} was successfully deleted`,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
