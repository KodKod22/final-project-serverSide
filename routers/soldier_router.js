
const express = require('express');
const { soldier_controller } = require('./controllers/soldier_controller');
const soldierRouter = new Router();

router.post('/addSoldier', soldier_controller.addSoldier);


module.exports =  {soldierRouter} ;