const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use new strategy for google login
passport.use(new googleStrategy(
    // called options available in oauth provided by google
    {
    clientID:"897686259244-qvi5jovgifpakl7icte15dsff9df99p6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
   },

   // 1. As we generate JWT token called as accessToken for authentiating other requests
   // in similar manner google also generate accessToken for us
   // and if accessToken expires the we use refreshToken to generate a new accessToken if user is not signed-In
   async function(accessToken, refreshToken, profile, done){
    // checking user found in codeial db or not 
    const user = await User.findOne({ email: profile.emails[0].value });
      try{
        console.log("Profile: ", profile);  
        // user found on codeial DB then signs In and set user as req.user
        if(user){
            return done(null, user);
        }
        // if user not found in codeial DB then creates the user in codeial via below creds
        // which will save our time as we need not to explicity write username and password as we did earlier
        // it will take user info loke usename and random password will generate from crypto
        // and Signs-Up
        else{
            const newUser = await User.create({
                //google saved his user name in this field
                name: profile.displayName,
                email: profile.emails[0].value,
                // generatting a reandom password in hex
                password: crypto.randomBytes(20).toString('hex'),
              });
              return done(null, newUser);
        }
    }
   catch(err){
    console.error('Error in Google strategy-passport:', err);
    return done(err);
   }
   }
));

module.exports = passport;





