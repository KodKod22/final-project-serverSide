const { Router } = require('express');
const operatorRouter = new Router();
const { operatorController} = require('../controllers/operatorController.js');
const { authMiddleware} = require('../middleware/auth.js');

operatorRouter.post('/addMission',authMiddleware.getSoldierID,operatorController.insertSoldierMission);
operatorRouter.get('/SimulationsRecords',operatorController.getSimulationsRecords);
operatorRouter.get('/Simulations',operatorController.getSimulations);
operatorRouter.get('/user',operatorController.getUser);
operatorRouter.delete('/deleteSimulations',operatorController.deleteSimulations);
operatorRouter.put('/updateSimulation', operatorController.updateSimulations);

module.exports = {operatorRouter};