const  nodeMailer = require('../config/nodemailer');


// This is Mailer function
// this is another way of exporting a method
exports.newComment = (comment,commentUser, postUser) => {
    console.log("Inside newComment mailer", comment);

    let htmlString = nodeMailer.renderTemplate(
        {
        comment: comment,    
        commentUser: commentUser,
        postUser: postUser
       }, 
       '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
            from: 'deepakjaiswar12098@gmail.com',
            to: postUser.email, // jo bhi coment karega on any post
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