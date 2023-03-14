const User   = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

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
      name    : req.body.name,
      lastName: req.body.lastName,
      email   : req.body.email,
      zipCode : req.body.zipCode,
      password: req.body.password
    });

    const oldUser = await User.findOne({ email: user.email })
    if ( oldUser ) return res.status(200).send({ success: false, message: "user already exists" })

    const salt    = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    user.token = jwt.sign({ user_id: user.id, user_email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" })
    res.send(user)
  } catch ( err ) {
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
    const user = await User.findOne({ email })

    const login = () => {
      user.token = jwt.sign({ user_id: user.id, email }, process.env.JWT_SECRET, { expiresIn: "2h" })
      res.status(200).send({ status: "success", message: "login success", user: user })
    }

    user ?
    await bcrypt.compare(password, user.password) ? login() :
    res.status(400).send({ status: "error", message: "bro wrong password " }) :
    res.status(400).send({ status: "error", message: "bro have no account" })

  } catch ( err ) {
    res.send(err)
  }
}

exports.logoutUser = async(req, res) => {
  if ( req.headers && req.headers["x-access-token"] ) {
    console.log(req.headers["x-access-token"])
    res.send("ok")
  }
  res.send("not ok")
}

exports.getUserById = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch ( err ) {
    res.send(err)
  }
}

exports.updateUser = async(req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: req.body.name + ' user updated' })
  } catch ( err ) {
    res.send(err)
  }
}

exports.deleteUser = async(req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send({message: "user deleted", user})
  } catch ( err ) {
    res.send(err)
  }
}