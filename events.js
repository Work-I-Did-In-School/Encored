'use strict';

// * this is where the event pool is created
// * we'll pass it into the subscribers/publishers
// * it enables us to emit and listen for events

// 3rd party resources
const EventEmitter = require('events');
const events = new EventEmitter();

module.exports = events;