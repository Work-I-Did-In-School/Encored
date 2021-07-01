'use strict';

// 3rd party resources
require('dotenv').config();
const io = require('socket.io');

// * hub for creating events
const server = io(3000);


server.on('connection', (socket) => {

  socket.emit('success', 'calling all channels');

  socket.on('pickup', (...args) => {
    console.log('🎉 EVENT:', ...args, '\n');
    server.emit('pickup', ...args);
  });

  socket.on('in transit', (...args) => {
    console.log('🎉 EVENT:', ...args, '\n');
  });
  
  socket.on('delivered', (...args) => {
    console.log('🎉 EVENT:', ...args, '\n');
    server.emit('delivered', ...args);
  });
});
