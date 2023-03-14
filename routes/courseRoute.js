const express = require('express');

const courseRouter = express.Router();
const courseController = require('../controllers/courseController')

courseRouter.get('/', courseController.getAllCourses);

courseRouter.post('/create', courseController.createCourse )

courseRouter.get('/:id', )

courseRouter.put('/:id/update', )

courseRouter.delete('/:id/delete', )

module.exports = courseRouter;