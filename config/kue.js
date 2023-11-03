const kue = require('kue');          // step-1 configuration of kue only require 3 lines 
                                    // after this we will create worker for each queue
const queue = kue.createQueue();

module.exports = queue;