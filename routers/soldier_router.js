
const express = require('express');
const { soldier_controller } = require('../controllers/soldier_controller');
const soldierRouter = new Router();

soldierRouter.post('/addSoldier', soldier_controller.addSoldier);


module.exports =  {soldierRouter} ;