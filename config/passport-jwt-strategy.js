const passport = require('passport');      // importing passport lib
const JWTStrategy = require('passport-jwt').Strategy;    // importing passport-jwt strategy
// importing a module which help us to extract the JWT from header 
const ExtractJWT = require('passport-jwt').ExtractJwt; 
const env = require('./environment');

// authenticating the user so require USER model
const User = require('../models/user');

let opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // finding jwt token from the Autherization header
        secretOrKey : env.jwt_secret  // this is key is used for encrypt-decrypt jwt token
}
console.log("options", opts);

// as in the passport-local strategy we authenticate the user's 
//email and password and then we put whole user info in the cookie  
// once the jwt token generated then we used below middleware to validate(authenticate) whether 
//generated token valid or not
// in below user is already present in the JWT and we just fetching the id of User from the jwt payload
// checking user is there or not

passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
     // if user not found
      if (!user) {
        return done(null, false);
      }
       // user found
      return done(null, user);
    } catch (error) {
      console.error('Error in finding user from JWT:', error);
      return done(error, false);
    }
  })
);


module.exports = passport;





