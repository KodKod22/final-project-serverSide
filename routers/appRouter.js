const { Router } = require('express');
const appRouter = new Router();
const { appController } = require('../controllers/appController.js');

appRouter.post('/feedback', appController.addFeedback);
appRouter.post('/getFeedback', appController.getFeedbackBySoldierID); // Use :soldierId for URL parameter
appRouter.get('/getTasks', appController.getTasks);

module.exports = { appRouter };
