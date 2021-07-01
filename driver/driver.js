'use strict';

// 3rd party resources
const io = require('socket.io-client');
const client = io.connect('http://localhost:3000/caps'); // todo change namespace
const inquirer = require('inquirer');

const name = process.argv[2];
//* node cullen.js [cullen]

client.on('success', () => {
  console.log(`👨‍💻  ${name} logging in`, '\n');

  // ? get all messages in my queue
  // ? wait wouldn't I have to put them in someone else's 'mailbox'
  // ? i think this could be seen on socket.listeners?
  client.emit('get all', name);

  inquirer
    .prompt([
      {
        type: 'string',
        message: 'send a message',
        name: 'response',
      },
    ])
    .then(answers => {
      client.emit('sent', answers.response);
    })
    .catch(error => {
      console.log(error);
    });

  client.on('sent', payload => {
    // ? dynamically create names...

    console.log(`🚚 Tim: ${payload.payload}`, '\n');
    client.emit('read', payload);
  });
});

// 'use strict';

// // 3rd party resources
// const io = require('socket.io-client');
// require('dotenv').config();
// const inquirer = require('inquirer');

// //start connection
// const client = io.connect('http://localhost:3000/caps');

// const FLOWERVENDOR = process.env.FLOWERVENDOR || '1-206-FLOWERS';

// client.on('success', () => {
//   console.log('🏢 Vendor connected', '\n');

//   inquirer
//     .prompt([
//       {
//         type: 'string',
//         message: 'send a message',
//         name: 'response'
//       }
//     ])
//     .then(answers => {
//       client.emit('pickup', answers.response);
//     })
//     .catch(error => {
//       console.log(error)
//     });

//   client.on('delivered', (payload) => {
//     console.log(`🏢 VENDOR: Thank you for delivering ${payload.id}`, '\n');
//     client.emit('received', payload);
//   })
// })

