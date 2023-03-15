const Subscriber = require('../models/subscriber');
const jwt        = require("jsonwebtoken");

exports.getSubscribers = async(req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch ( err ) {
    res.send(err)
  }
}

//If already a subscriber it logins, else it creates a new subscriber
exports.createSubscriber = async(req, res) => {
  const subscriber   = new Subscriber({
    name   : req.body.name,
    email  : req.body.email,
    zipCode: req.body.zipCode
  });
  const isSubscriber = await Subscriber.findOne({ email: req.body.email });
  if ( isSubscriber ) {
    subscriber.token = jwt.sign({
      subscriber_id   : subscriber.id,
      subscriber_email: subscriber.email
    }, process.env.JWT_SECRET, { expiresIn: "2h" })
    res.status(200).send({ status: "success", message: "subscriber login success", subs: subscriber })
  } else {
    await subscriber.save();
    subscriber.token = jwt.sign({
      subscriber_id   : subscriber.id,
      subscriber_email: subscriber.email
    }, process.env.JWT_SECRET, { expiresIn: "2h" })
    res.status(200).send({ status: "success", message: "subscriber create success", subs: subscriber })
  }
}

exports.getSubscriberById = async(req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    res.send(subscriber);
  } catch ( err ) {
    res.send(err)
  }
}

exports.updateSubscriber = async(req, res) => {
  try {
    await Subscriber.findByIdAndUpdate(req.params.id, req.body)
    res.send({message: req.body.name + " update success"})
  } catch ( err ) {
    res.send(err)
  }
}

exports.deleteSubscriber = async(req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    res.send({message: "delete success"}, subscriber)
  } catch ( err ) {
    res.send(err)
  }
}