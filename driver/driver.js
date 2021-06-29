'use strict';

// esoteric resources
const events = require('../events');

const pickupHandler = (...args) => {
  console.log(`DRIVER: Picked up ${args[0].payload.orderId}`, '\n');
  args[0].event = 'in transit';

  events.emit('in transit', ...args);
};

const deliveryHandler = (...args) => {
  args[0].event = 'delivered';
  console.log(`DRIVER: Delivered ${args[0].payload.orderId}`);

  events.emit('delivered', ...args);
};

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