const AppError = require('../utils/appError');

const error = new AppError('Halu', 400);

console.error(error);
