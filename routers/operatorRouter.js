const { Router } = require('express');
const operatorRouter = new Router();
const { operatorController} = require('../controllers/operatorController.js');
module.exports = {operatorRouter};

operatorRouter.get('/Simulations',operatorController.getSimulations);