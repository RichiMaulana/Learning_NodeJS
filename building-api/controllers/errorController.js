const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  //   console.log(err.original.message);
  const message = `${err.errors[0].path}: ${err.errors[0].value}. ${err.errors[0].type}`;

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
    // if (error.name === 'Error') error.message = err.message;
    if (error.name === 'SequelizeUniqueConstraintError')
      error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
