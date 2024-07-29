const ms = require('../server/main');

const {simulationFeedback_controller } = require('../controllers/simulationFeedback_controller');

ms.getApp().post('/api/simulationFeedback/addSimulationFeedback', simulationFeedback_controller.addSimulationFeedback);