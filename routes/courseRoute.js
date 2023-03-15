const express = require('express');

const courseRouter     = express.Router();
const courseController = require('../controllers/courseController')
const isAuth           = require("../middleware/auth");

courseRouter.get('/', courseController.getAllCourses);

courseRouter.post('/create',isAuth, courseController.createCourse )

courseRouter.get('/:id', courseController.getCourse);

courseRouter.put('/:id/update',isAuth, courseController.updateCourse)

courseRouter.delete('/:id/delete',isAuth, courseController.deleteCourse)

module.exports = courseRouter;