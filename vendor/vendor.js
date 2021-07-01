'use strict';

// 3rd party resources
const faker = require('faker');
const io = require('socket.io-client');
require('dotenv').config();

//start connection
const client = io.connect('http://localhost:3000/caps');

const FLOWERVENDOR = process.env.FLOWERVENDOR || '1-206-FLOWERS';
// const WIDGETVENDOR = process.env.WIDGETVENDOR;

client.on('success', () => {
  console.log('🏢 Vendor connected', '\n')

  setInterval(() => {
    const payload = {
      event: 'pickup',
      time: faker.datatype.datetime(),
      payload: {
        storeName: FLOWERVENDOR,
        orderId: faker.datatype.uuid(),
        customerName: faker.name.findName(),
        address: faker.address.streetAddress(),
      }
    }
    
    client.emit('pickup', payload);
  }, 5000);

  client.on('delivered', (payload) => {
    console.log(`🏢 VENDOR: Thank you for delivering ${payload.id}`, '\n');
    client.emit('received', payload);
  })
})

