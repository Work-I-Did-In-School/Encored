'use strict';

// 3rd party resources
const io = require('socket.io-client');
const client = io.connect('http://localhost:3000');

// esoteric resources
// const pickupHandler = require('./pickup');
// const deliveryHandler = require('./delivered');

client.on('success', () => {
  console.log('🚚  drivers logging in');

  client.on('pickup', (...args) => {
    setTimeout(() => {
      console.log(`DRIVER: Picked up ${args[0].payload.orderId}`, '\n');
      args[0].event = 'in transit';
    
      client.emit('in transit', ...args);
    }, 1500);

    setTimeout(() => {
      console.log(`DRIVER: Delivered ${args[0].payload.orderId}`, '\n');
      args[0].event = 'delivered';
    
      client.emit('delivered', ...args);
    }, 3000);
  });
});
