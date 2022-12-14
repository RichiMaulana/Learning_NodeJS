const express = require('express');

const tourController = require('../controllers/toursController');

const tourRouter = express.Router();

// Param in middleware
// Can be used to check the ID first, so the endpoint that needs the id is always get the id, and to prevent re write or use the same code every time it needed
// AKA used to validation the ID
// tourRouter.param('uuid', tourController.checkId);

tourRouter
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route('/tour-stats').get(tourController.getToursStats);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRouter.route('/monthly-plan/:year?').get(tourController.getMonthlyPlan);

tourRouter
  .route('/:uuid')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
