'use strict';

// 3rd party resources
const io = require('socket.io-client');
const client = io.connect('http://localhost:3000/caps'); // make sure this is the right namespace

client.on('success', () => {
  console.log('🚚  drivers logging in', '\n');

  // * get all queued orders
  // * deliver each one -> send the payload over the connection
  // * caps on the other side will emit a pick up event for each queued order
  client.emit('get all');

  client.on('pickup', payload => {
    setTimeout(() => {
      //destructure payload here maybe?
      console.log(`🚚 DRIVER: Picked up ${payload.id}`, '\n');
      payload.payload.event = 'in transit';
    
      client.emit('in transit', payload);
    }, 1500);

    setTimeout(() => {
      console.log(`🚚 DRIVER: Delivered ${payload.id}`, '\n');
      payload.payload.event = 'delivered';
    
      client.emit('delivered', payload);
    }, 3000);
  });
});
