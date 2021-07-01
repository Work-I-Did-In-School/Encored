'use strict';

// 3rd party resources
const faker = require('faker');
const io = require('socket.io-client');
const client = io.connect('http://localhost:3000');

client.on('success', () => {
  console.log('🏢 Vendor connected', '\n')

  setInterval(() => {
    const payload = {
      event: 'pickup',
      time: faker.datatype.datetime(),
      payload: {
        storeName: process.env.STORENAME,
        orderId: `${faker.random.alphaNumeric(5)}-${faker.random.alphaNumeric(3)}-${faker.random.alphaNumeric(8)}`,
        customerName: faker.name.findName(),
        address: faker.address.streetAddress(),
      }
    }
    
    client.emit('pickup', payload);
  }, 5000);

  client.on('delivered', (...args) => {
    console.log(`🏢 VENDOR: Thank you for delivering ${args[0].payload.orderId}`, '\n')
  })
})

