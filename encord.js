'use strict';

// === === 3rd party resources === === //
const http = require('http').createServer();
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// === === esoteric resources === === //
const MessageQueue = require('./MessageQueue');

io.on('connection', (socket) => {
  console.log('connected', socket.id); //todo come back to this
  socket.on('message', (payload) => {
    console.log(payload);
    socket.broadcast.emit('message', payload);
  });
});


io.on('disconnect', (payload) => {
  console.log('somebody left');
});

http.listen(PORT, () => console.log(`server is listening on ${PORT}`));
