const express = require('express');

const subscriberRouter     = express.Router();
const subscriberController = require('../controllers/subscriberController')
const isAuth               = require("../middleware/auth");

subscriberRouter.get('/', subscriberController.getSubscribers);

subscriberRouter.post('/create', subscriberController.createSubscriber);

subscriberRouter.get('/:id', subscriberController.getSubscriberById);

subscriberRouter.put('/:id/update',isAuth, subscriberController.updateSubscriber);

subscriberRouter.delete('/:id/delete',isAuth, subscriberController.deleteSubscriber);

module.exports = subscriberRouter