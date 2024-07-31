const { Router } = require('express');
const soldierRouter = new Router();
const { soldierController } = require('../controllers/soldier_controller');

soldierRouter.post('/addSoldier', soldierController.addSoldier);
soldierRouter.get('/getRoles', soldierController.getRoles);

module.exports = {soldierRouter};