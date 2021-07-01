'use strict';

// 3rd party resources
const io = require('socket.io-client');
require('dotenv').config();
const inquirer = require('inquirer');

//start connection
const client = io.connect('http://localhost:3000/encord');


// const FLOWERVENDOR = process.env.FLOWERVENDOR || '1-206-FLOWERS';
const clientName = process.argv[2];
const recipient = process.argv[3];
// node client timbo


client.on('success', () => {
  console.log(`${clientName}, logging in`, '\n');
  console.log(recipient);

  client.emit('get all', clientName);

  inquirer
    .prompt([
      {
        type: 'string',
        message: 'send a message',
        name: 'response'
      }
    ])
    .then(answers => {
      const payload = {
        clientName: clientName,
        message: answers.response,
      }

      client.emit('sent', payload);
    })
    .catch(error => {
      console.log(error)
    });

  client.on('delivered', (payload) => {
    console.log(`🏢 VENDOR: Thank you for delivering ${payload.id}`, '\n');
    client.emit('received', payload);
  })
})
