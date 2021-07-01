'use strict';

// 3rd party resources
require('dotenv').config();
const io = require('socket.io');

// esoteric resources
const MessageQueue = require('./MessageQueue');

// setup message queue
const flowers = new MessageQueue('flowers');
// const widgets = new MessageQueue('Widgets');


const server = io(3000);

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  socket.emit('success');

  console.log('connected to', socket.id);

  socket.on('pickup', payload => {
    console.log('🎉 EVENT:', payload, '\n');

    try {
      let flowerOrder = flowers.add(payload);
      socket.emit('added');
      caps.emit('pickup', {
        id: flowerOrder.id,
        payload: flowerOrder.value,
      });
    } catch(e) {
      console.error(e);
    }
  });

  socket.on('get all', () => {
    const allFlowers = flowers.getAll();

    allFlowers.forEach(order => {  
      socket.emit('pickup', order);
    });
  });

  socket.on('in transit', (...args) => {
    console.log('🎉 EVENT:', ...args, '\n');
  });
  
  socket.on('delivered', (...args) => {
    console.log('🎉 EVENT:', ...args, '\n');
    caps.emit('delivered', ...args);
  });

  socket.on('received', (message) => {
    flowers.received(message.id);
  });
});
