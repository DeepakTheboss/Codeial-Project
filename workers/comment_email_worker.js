// this is a worker which we have created for sending the mail for us instead of sending via controllers 

const queue = require('../config/kue');                                 // we created a queue 

const commentsMailer = require('../mailers/comments_mailer');         // we have imported the comments_ mailer

// every worker has the process function  and process function tells the worker
// whenever a new task is added into a queue you need to run the code inside in this process function
// 2 parameter queue i.e is emails  and function(job, done)
// function have takes 2 parameter job, done
// inside function we are doing 2 important things
//1. running the comments mailer for sending comments email and other is job i.e is data that is comment

queue.process('emails',   function(emailjob, done){
    console.log('emails worker is processing a job ', emailjob.data);
   // console.log('this is whole Emailjob object:', emailjob)

  // note no need of below for clean code only for the understanding that we can also do this things also  
  // from below 3 lines we are assigning from whole object to seperte object 
  // so that in comments_mailer.js we can access anything seperatly example postUser ==> emailjob.postUser
        // const comment = emailjob.data.comment;
        // const commentUser = emailjob.data.commentUser;
        // const postUser = emailjob.data.postUser;


  // console.log('Comment worker:', comment);
  // console.log('Comment User worker:', commentUser);
  // console.log('Post User worker:', postUser);
  

    commentsMailer.newComment(emailjob.data);    // comments that being send inside job.data
    done();
});