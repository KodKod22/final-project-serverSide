const { Router } = require('express');
const soldierRouter = new Router();
const { soldierController } = require('../controllers/soldier_controller');

soldierRouter.post('/addSoldier', soldierController.addSoldier);
soldierRouter.post('/deleteSoldier', soldierController.deleteSoldier);
soldierRouter.get('/getRoles', soldierController.getRoles);
soldierRouter.get('/getSoldiers', soldierController.getSoldiers);
soldierRouter.get('/getSoldiersProfile/:soldierId', soldierController.getSoldiersProfile);
soldierRouter.get('/SimulationsRecords',soldierController.getSimulationsRecords);
soldierRouter.get('/getAFVs', soldierController.getAFVs);
soldierRouter.get('/getAllSimulations', soldierController.getSimulations);
soldierRouter.get('/getSimulationRecord/:id', soldierController.getSimulationRecord);
soldierRouter.get('/getSoldiersProfile', soldierController.getSoldiersProfile);
soldierRouter.get('/getDifficulty', soldierController.getDifficulty);


module.exports = {soldierRouter};