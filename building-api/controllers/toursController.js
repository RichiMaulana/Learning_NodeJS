// Using sequelize and PostgreSQL

const { toursModel } = require('../models');

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

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedQueryObj = [
      'page',
      'sort',
      'limit',
      'fields',
      'order',
      'size',
    ];
    excludedQueryObj.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\bgte|gt|lte|lt\b/g, (match) => `$${match}`);

    ///

    let attributes;
    if (req.query.fields) {
      attributes = req.query.fields.split(',');
    }

    const { page } = req.query || 1;
    const { limit } = req.query || 100;
    const skip = Math.max(page - 1, 0) * limit;

    if (req.query.page) {
      const toursCount = await toursModel.count();
      if (skip >= toursCount) throw new Error('This page does not exist');
    }

    const query = {
      limit: limit,
      where: JSON.parse(queryStr),
      offset: skip,
      order: [[req.query.sort, req.query.order || 'DESC']],
      attributes,
    };

    // const query = new APIFeature(req.query).query();
    // console.log(req.query);

    const tours = await toursModel.findAll(query);
    // const tours = await toursModel.findAll({
    //   where: queryObj,
    //   limit: req.query.limit,
    //   offset: req.query.page,
    // });

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
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
  try {
    const tour = await toursModel.create(req.body);

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

  try {
    await toursModel.update(req.body, {
      where: uuid,
    });

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
