const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController')

userRouter.get('/', userController.getUsers);

userRouter.post('/create', userController.createUser);

userRouter.post('/login', userController.loginUser);

// userRouter.post('/logout', userController.logoutUser);

// userRouter.get('/:id', userController.getUserById);

// userRouter.put('/:id', userController.updateUser);

// userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter