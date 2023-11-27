const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// this is the part who sends the e-mail how the communication going to be happen
// transporter defines the configurations using which I will be sending mails
// and email required some templates so we need to define some template also called as html-template-mails

let transporter = nodemailer.createTransport(env.smtp);

// this is to render template that whatever html file I am going to send 
// that is placed in views of mailer folder



// relatvePath is from where the mail is being sent
// ejs is used bcs will be sending templates for mails
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data, 
        function(err, template){
            if(err)
            {
             console.log('error in rendering template');
             return;
            }

            mailHTML = template;
        }
    )

    return mailHTML;

}

module.exports = {
    transporter: transporter,
    renderTemplate:renderTemplate
}