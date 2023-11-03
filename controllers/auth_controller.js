 const User = require('../models/user');
 const AccessToken = require('../models/accessToken');
 const resetPasswordMailer = require('../mailers/reset_password_mailer');
 const crypto = require('crypto');
 const { access } = require('fs');
 const { localsName } = require('ejs');

 module.exports.auth = function(req, res){
    return res.render('verify_email', {
        title: "Codeial | Verify",
    });
 }

 module.exports.verifyEmail = async function(req, res){

    let user = await User.findOne({email: req.body.email});
   // if user found in db
    if(user){
        let token = await crypto.randomBytes(20).toString('hex');
        let accessToken = await AccessToken.create({
            user: user,
            token: token,
            isValid: true
        });
        console.log('verify-email ACCESSTOKEN:--', accessToken);
        resetPasswordMailer.resetPassword(accessToken);
        return res.render('account_verified', {
            title: "Codeial | Account Verified",
        });
    }else{
        req.flash("error", "Account does not exist with this email");
        return res.redirect('back');
    }
 }


module.exports.resetPassword = async function (req, res) {

    try {
          console.log("Token: ", req.query.accessToken);
          let accessTokenObject = await AccessToken.findOne({token: req.query.accessToken});
          console.log("Object: ", accessTokenObject);
            if (accessTokenObject.isValid) {
                return res.render('reset_password', {
                    title: 'Codeial | Reset Password',
                    token: accessTokenObject.token
                });
            } else {
                req.flash('error', 'Token is Expired! Please regenerate it.');
                return res.redirect('/auth');
            }
       
    } catch (error) {
        console.error('Error finding the access token:', error);
        req.flash('error', 'An error occurred. Please try again later.');
        return res.redirect('/auth');
    }
};
  

module.exports.reset = async function(req, res) {
    try {
        console.log("We are inside the reset functionality: ", req.query);

        let accessTokenObject = await AccessToken.findOne({ token: req.query.token_key });

        if (accessTokenObject) {
            console.log('AccessToken Present');
            if (accessTokenObject.isValid) {
                console.log('AccessToken is valid');
                if (req.body.password == req.body.confirm_password) {
                    console.log('Password matched');
                    let user = await User.findById(accessTokenObject.user);
                    if (user) {
                        console.log('User found', user);
                        user.password = req.body.password;
                        user.confirm_password = req.body.confirm_password;
                        // Ensure saving the user changes
                        await user.save();

                        console.log('Password changed', user);
                        req.flash('success', 'Password Changed');

                        accessTokenObject.isValid = false;
                        // Ensure saving the access token changes
                        await accessTokenObject.save();

                        return res.redirect('/users/sign-in');
                    }
                } else {
                    req.flash('error', 'Password didn\'t match');
                    return res.redirect('back');
                }
            }
        }

        req.flash('error', 'Token is Expired! Please regenerate it.');
        return res.redirect('/auth');
    } catch (error) {
        console.error('Error occurred:', error);
        req.flash('error', 'An error occurred. Please try again later.');
        return res.redirect('/auth');
    }
};



