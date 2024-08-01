const { Router } = require('express');
const soldierRouter = new Router();
const { soldierController } = require('../controllers/soldier_controller');

soldierRouter.post('/addSoldier', soldierController.addSoldier);
soldierRouter.post('/deleteSoldier', soldierController.deleteSoldier);
soldierRouter.get('/getRoles', soldierController.getRoles);
soldierRouter.get('/getSoldiers', soldierController.getSoldiers);
soldierRouter.get('/getSoldiersProfile', soldierController.getSoldiersProfile);


module.exports = {soldierRouter};