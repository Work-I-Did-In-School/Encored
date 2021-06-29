'use strict';

// 3rd party resources
const events = require('../events');

module.exports = (...args) => {
  args[0].event = 'delivered';
  console.log(`DRIVER: Delivered ${args[0].payload.orderId}`);

  events.emit('delivered', ...args);
};
