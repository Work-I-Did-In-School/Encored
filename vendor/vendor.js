'use strict';

// 3rd party resources
const faker = require('faker');

// esoteric resources
const events = require('../events');
const deliveryHandler = require('./delivery-handler.js')

events.on('delivered', (...args) => {
  deliveryHandler(...args);
});

setInterval(() => {
  const payload = {
    event: 'pickup',
    time: faker.datatype.datetime(),
    payload: {
      storeName: process.env.STORENAME,
      orderId: `${faker.random.alphaNumeric(5)}-${faker.random.alphaNumeric(3)}-${faker.random.alphaNumeric(8)}`,
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
  }
  
  events.emit('pickup', payload);
}, 5000);
