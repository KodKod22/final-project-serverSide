const { Router } = require('express');
const operatorRouter = new Router();
const { operatorController} = require('../controllers/operatorController.js');


operatorRouter.post('/addMission',operatorController.insertSoldierMission);
operatorRouter.get('/SimulationsRecords',operatorController.getSimulationsRecords);
operatorRouter.get('/Simulations',operatorController.getSimulations);
operatorRouter.post('/user',operatorController.getUser);
operatorRouter.post('/Simulation',operatorController.getSimulation)
operatorRouter.delete('/deleteSimulations',operatorController.deleteSimulations);
operatorRouter.put('/updateSimulation', operatorController.updateSimulations);

module.exports = {operatorRouter};