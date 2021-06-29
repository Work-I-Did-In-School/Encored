'use strict';

// esoteric resources
const events = require('../events');
const pickupHandler = require('./pickup');
const deliveryHandler = require('./delivered');

events.on('pickup', (...args) => {
  setTimeout(() => {
    pickupHandler(...args);
  }, 1000);
});

events.on('in transit', (...args) => {
  setTimeout(() => {
    deliveryHandler(...args);
  }, 3000);
});