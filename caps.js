'use strict';

// === === 3rd party resources === === //
require('dotenv').config();
const io = require('socket.io');
const server = io(3000);
const encord = server.of('/encord');


// === === esoteric resources === === //
const MessageQueue = require('./MessageQueue');


// === === Message Queue === === //
const queues = {
  timbo: new MessageQueue('timbo'),
  cullen: new MessageQueue('cullen'),
};


// === === payload === === //
// const payload = {
//   messageId,
//   clientName,
//   payload,
// };


// === === socket stuff === === //
encord.on('connection', (socket) => {
  socket.emit('success');
  console.log('connected to', socket.id);

  // === sent === //
  socket.on('sent', payload => {
    console.log('👨‍💻MESSAGE:', payload, '\n');

    try {
      let clientMessage = queues[payload.clientName].add(payload.message);
      encord.emit('sent', {
        id: clientMessage.id,
        payload: clientMessage.value,
      });
    } catch (e) {
      console.error(e);
    }
  });

  // === get all === //
  socket.on('get all', (payload) => {
    const allMessages = queues[payload].getAll();

    allMessages.forEach(message => {
      socket.emit('sent', message);
    });
  });

  // === in transit === //
  socket.on('in transit', (...args) => {
    console.log('👨‍💻MESSAGE:', ...args, '\n');
  });

  // === delivered === //
  socket.on('delivered', (...args) => {
    console.log('👨‍💻MESSAGE:', ...args, '\n');
    encord.emit('delivered', ...args);
  });

  // === read === //
  socket.on('read', (message) => {
    queues.received(message.id);
  });
});
