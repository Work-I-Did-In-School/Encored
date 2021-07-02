'use strict';

// 3rd party resources
const io = require('socket.io-client');
const client = io.connect('http://localhost:3000/encord'); // todo change namespace
const inquirer = require('inquirer');

const clientName = process.argv[2] || 'cullen';
const recipient = process.argv[3] || 'timbo';

client.on('success', () => {
  console.log(`${clientName}, logging in`, '\n');
  console.log(recipient);

  client.emit('join', 'cullenAndTim');

  client.emit('get all', 'cullenAndTim');

  inquirer
    .prompt([
      {
        type: 'string',
        message: `${clientName}:`,
        name: 'response',
      },
    ])
    .then(answers => {
      const payload = {
        room: 'cullenAndTim',
        clientName: clientName,
        message: answers.response,
      };

      client.emit('sent', payload);
    })
    .catch(error => {
      console.log(error);
    });
    
  client.on('sent', (payload) => {
    console.log(payload.payload, '\n');
    client.emit('read', payload);
  });
});