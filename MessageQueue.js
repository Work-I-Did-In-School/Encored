'use strict';

const uuid = require('uuid').v4; // using uuid v4

// ? why would I make a message queue?
// ? what is a message queue
class MessageQueue {
  constructor(name){
    this.name = name;
    this.messages = {}; // * so this is where we'll store the messages
  }

  add(payload) {
    if(!payload){ throw new Error('Add message error: undefined or invalid message'); }

    // ? what's this doing here
    // ? assuming this is adding a key to a message, so we can access it later
    let key = uuid();

    // * stores added payload under key: payload
    this.messages[key] = payload;  

    return {
      id: key,
      value: payload,
    };
  }

  getAll() {
    return Object.keys(this.messages).map( id => {
      // maps over each item in messages and returns an array
      // the array is composed of objects {id, payload}
      return {id, payload: this.messages[id]};
    });
  }

  // when the message has been received by the vendor
  // delete it from the queue
  received(id) {
    delete this.messages[id];
  }
}

module.exports = MessageQueue;