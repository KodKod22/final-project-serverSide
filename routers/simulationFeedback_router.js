const { Router } = require('express');
const simulationFeedbackRouter = new Router();
const {simulationFeedbackController } = require('../controllers/simulationFeedback_controller');

simulationFeedbackRouter.post('/addSimulationFeedback', simulationFeedbackController.addSimulationFeedback);
module.exports = {simulationFeedbackRouter};

