const nodeMailer = require('../config/nodemailer');

module.exports.resetPassword = function(accessToken){
    console.log("Current user's email: ", accessToken.user.email);
    //making html template for reset password
    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken}, "/reset_password/reset_password_mail.ejs");

    nodeMailer.transporter.sendMail({
        from: 'deepakjaiswar12098@gmail.com' , // sender address
        to: accessToken.user.email, // list of receivers
        subject: "Codeial: Reset Password using email", // Subject line
        html: htmlString // html body
    }, function(err, info){
        if(err){
            console.log("Error in send reset password mail", err);
            return;
        }

        console.log("Message Sent", info);
        return;
    });
}