const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  //   console.log(err.original.message);
  const message = `Duplicate Value ${err.errors[0].path}: ${err.errors[0].value}. ${err.errors[0].type}`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = err.errors.map((el) => el.message);
  const message = errors.map((el) => `Validation error: ${el}`);

  // `Validation error: ${err.errors[0].message}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    code: err.statusCode,
    message: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'SequelizeUniqueConstraintError')
      error = handleCastErrorDB(error);
    if (error.name === 'SequelizeValidationError')
      error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
