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

  socket.on('join', (room) => {
    if(!queues[room]) { queues[room] = new MessageQueue(room); }
    socket.join(room);
  });

  console.log('connected to', socket.id);

  // === sent === //
  socket.on('sent', payload => {
    console.log('👨‍💻MESSAGE:', payload, '\n');

    try {
      let clientMessage = queues[payload.room].add(payload.message);

      encord.to(payload.room)
        .emit('sent', {
          room: payload.room,
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

  // === read === //
  socket.on('read', (message) => {
    console.log('🚧 testing:', queues[message.room].messages);
    queues[message.room].received(message.id);
  });
});
