const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

// this is the part who sends the e-mail how the communication going to be happen
// transporter defines the configurations using which I will be sending mails
// and email required some templates so we need to define some template also called as html-template-mails

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',  
    port: 587,           // this is highly secure port TSL
    secure: false,        //as of now we are not using 2 factor authentication for mails hence its false

    // need to establish your identity against Gmail so that they track your things if something goes wrong
    // eg. in from section mail you are giving any name
    auth: {
        user: 'deepakjaiswar12098@gmail.com',
        pass: 'ofrn zprm adgr cbrp'
    }
});

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