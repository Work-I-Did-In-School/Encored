'use strict';

// 3rd party resources
const events = require('../events');

module.exports = (...args) => {
  console.log(`DRIVER: Picked up ${args[0].payload.orderId}`, '\n');
  args[0].event = 'in transit';

  events.emit('in transit', ...args);
};