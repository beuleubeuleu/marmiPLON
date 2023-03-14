const express = require('express');

const userRouter     = express.Router();
const userController = require('../controllers/userController')
const isAuth         = require("../middleware/auth");

userRouter.get('/', userController.getUsers);

userRouter.post('/create', userController.createUser);

userRouter.post('/login', userController.loginUser);

userRouter.get('/logout',isAuth, userController.logoutUser);

userRouter.get('/:id', userController.getUserById);

userRouter.put('/:id/update', userController.updateUser);

userRouter.delete('/:id/delete', userController.deleteUser);

module.exports = userRouter