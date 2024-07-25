
const express = require('express');
const { soldier_controller } = require('../controllers/soldier_controller');
const soldierRouter = new Router();

soldierRouter.post('/addSoldier', upload.single('s_img')(req, res) => {
    soldier_controller.addSoldier(req, res);
});


module.exports =  {soldierRouter} ;