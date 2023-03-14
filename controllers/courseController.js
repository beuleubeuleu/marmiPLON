const Course = require('../models/course');

exports.getAllCourses = async(req, res) => {
  try {
    const courses = await Course.find()
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

exports.getCourse = async(req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.send(course)
  } catch ( err ) {
    res.send(err)
  }
}

exports.updateCourse = async(req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: req.body.title + ' Course updated' })
  } catch ( err ) {
    res.send(err)
  }
}

exports.deleteCourse = async(req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.send({message: "course deleted", course})
  } catch ( err ) {
    res.send(err)
  }
}