'use strict';

module.exports = (...args) => {
  console.log(`VENDOR: Thank you for delivering ${args[0].payload.orderId}`, '\n');
};