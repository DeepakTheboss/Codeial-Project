const  nodeMailer = require('../config/nodemailer');


// This is Mailer function
// this is another way of exporting a method
module.exports.newComment = (commentUser, postUser) => {
    console.log("Inside newComment mailer", comment);

    nodeMailer.transporter.sendMail({
            from: 'deepakjaiswar12098@gmail.com',
            to: postUser.email, // jo bhi coment karega on any post
            subject: 'New Comment Published!',
            html: "<h1>Yup, your comment is now published!</h1>"
        } , (err, info) => {
            if(err){
            console.error("Error in sending mail", err);
            return;
            }
            console.log("Mail sent", info);
            return;
        });

    
};