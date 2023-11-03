const  nodeMailer = require('../config/nodemailer');


// This is Mailer function
// this is another way of exporting a method
// exports.newComment = (comment,commentUser, postUser) => {
    exports.newComment = (emailjob) => {
    console.log("Inside newComment mailer data coming from worker", emailjob.comment);
    console.log("PostUser inside mailer:", emailjob.postUser);
    let htmlString = nodeMailer.renderTemplate(
        {
        comment: emailjob.comment,    
        commentUser: emailjob.commentUser,
        postUser: emailjob.postUser
       }, 
       '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
            from: 'deepakjaiswar12098@gmail.com',
            to: emailjob.postUser.email, // jo bhi coment karega on any post
            subject: 'New Comment Published!',
            html: htmlString
        } , (err, info) => {
            if(err){
            console.error("Error in sending mail", err);
            return;
            }
            console.log("Mail sent", info);
            return;
        });

    
};