const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch ( err ) {
    res.send(err)
  }
}

exports.createUser = async(req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      zipCode: req.body.zipCode,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.send(user)
  } catch(err) {
    res.send(err)
  }
}

exports.loginUser = async(req, res) => {
  try {
    const { email, password } = req.body;
    if ( !(email && password) ) return res.status(400).send({
      success: false,
      message: "email and password are required"
    })
    const user = await User.findOne({ email: email })
    if ( user && (await bcrypt.compare(password, user.password)) ) {
      user.token = jwt.sign({ user_id: user.id, email }, process.env.JWT_SECRET, { expiresIn: "2h" })
      res.status(200).send({ status: "success", message: "login success", user: user })
    } else {
      res.status(400).send({ status: "error", message: "bro wrong password or email"})
    }
  } catch ( err ) {
    res.send(err)
  }
}