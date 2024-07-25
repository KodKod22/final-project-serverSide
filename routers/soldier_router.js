const express = require('express');
const soldierRouter = express.Router();
const { soldier_controller } = require('../controllers/soldier_controller');

soldierRouter.post('/addSoldier', soldier_controller.addSoldier);

module.exports = soldierRouter;