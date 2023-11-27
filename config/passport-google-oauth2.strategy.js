const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');


// tell passport to use new strategy for google login
passport.use(new googleStrategy(
    // called options available in oauth provided by google
    {
    clientID:env.google_client_ID,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_call_back_URL,
    passReqToCallback: env.google_passReqToCallback // then "req" will be 1st argument in async function
   },

   // 1. As we generate JWT token called as accessToken for authentiating other requests
   // in similar manner google also generate accessToken for us
   // and if accessToken expires the we use refreshToken to generate a new accessToken if user is not signed-In
   async function(req, accessToken, refreshToken, profile, done){
    
      try{
        // checking user found in codeial db or not 
      const user = await User.findOne({ email: profile.emails[0].value });
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
              // if error while creating a newly user or user not found 
              if(!newUser){
                console.log('Error in craeting user via Google strategy-passport:');
                return done(null, false);
              }
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





