'use strict';

// 3rd party resources
const socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl');
const chalk = require('chalk');

const username = process.argv[2] || `user${Math.floor(Math.random() * 100)}`;

socket.on('disconnect', () => {
  socket.emit('disconnect');
});

socket.on('connect', () => {
  console.log(chalk.green('\\\\\\\\ welcome to the room \\\\\\\\'));
});

socket.on('message', (payload) => {
  const {cmd, username} = payload;
  console.log(chalk.blue(`${username}: ${cmd.split('\n')[0]}`));
});

repl.start({
  prompt: '',
  eval: (cmd) => {
    socket.send({cmd, username});
  },
});
