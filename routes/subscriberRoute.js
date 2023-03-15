const express = require('express');

const subscriberRouter     = express.Router();
const subscriberController = require('../controllers/subscriberController')

subscriberRouter.get('/', subscriberController.getSubscribers);

subscriberRouter.post('/create', subscriberController.createSubscriber);

subscriberRouter.get('/:id', subscriberController.getSubscriberById);

subscriberRouter.put('/:id/update', subscriberController.updateSubscriber);

subscriberRouter.delete('/:id/delete', subscriberController.deleteSubscriber);

module.exports = subscriberRouter