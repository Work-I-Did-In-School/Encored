'use strict';

// 3rd party resources
const io = require('socket.io-client');
const client = io.connect('http://localhost:3000/caps');
const inquirer = require('inquirer');

client.on('success', () => {
  console.log('🚚  drivers logging in', '\n');

  client.emit('get all');

  inquirer
    .prompt([
      {
        type: 'string',
        message: 'send a message',
        name: 'response',
      },
    ])
    .then(answers => {
      client.emit('pickup', answers.response);
    })
    .catch(error => {
      console.log(error);
    });

  client.on('pickup', payload => {
    setTimeout(() => {
      //destructure payload here maybe?
      console.log(`🚚 DRIVER: Picked up ${payload.payload}`, '\n');
    
      // todo change event names 
      client.emit('in transit', payload);
    }, 1500);

    setTimeout(() => {
      console.log(`🚚 DRIVER: Delivered ${payload.id}`, '\n');
      payload.payload.event = 'delivered';
    
      client.emit('delivered', payload);
    }, 3000);
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

