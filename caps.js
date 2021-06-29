'use strict';

// 3rd party resources
require('dotenv').config();

// esoteric resources
const events = require('./events.js');

// ? what are these for?
require('./vendor/vendor');
require('./driver/driver');

events.on('pickup', (...args) => console.log('EVENT:', ...args, '\n'));
events.on('in transit', (...args) => console.log('EVENT:', ...args, '\n'));
events.on('delivered', (...args) => console.log('EVENT:', ...args, '\n'));