
const Course = require('../models/course');

exports.getAllCourses = async(req, res) => {
  try {
    const courses = Course.find()
    res.send(courses);
  } catch ( err ) {
    res.send(err)
  }
}

exports.createCourse = async(req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch ( err ) {
    res.send(err)
  }
}