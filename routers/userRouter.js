const {Router} = require('express');
const { userController} = require('../controllers/userController.js');
const userRouter = new Router();

userRouter.post('/user', userController.getUser);
module.exports = {userRouter};
