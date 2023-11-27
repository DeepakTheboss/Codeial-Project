const passport = require('passport');
//using passport-local strategy
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const env = require('./environment');

// authenticate the user 
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: env.google_passReqToCallback // then "req" will be 1st argument in async function
    },
    async (req,email, password, done) => {
      try {
        const user = await User.findOne({ email });
        
        if(user){
        if (user.password !== password) {
          req.flash('error', 'Invalid Username/Password');
          return done(null, false); // Signifies that user is not authenticated with no errors
        }

        return done(null, user); // Signifies that user is authenticated with no errors
      }
      // handled if email is not present in db then user will be null
      else {
        req.flash('error', 'User not found');
        return done(null,false);
      }
      } catch (err) {
        req.flash('error', err);
        //console.error('Error in finding the user:', err);
        return done(err); // Propagating error to Passport
      }
    }
  )
);




//serialize the user (saving the key to cookies in encrypted form)
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserialize the user when the new request comes from browser
// passport.deserializeUser(function(id,done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('error in finding the user');
//             return done(err);
//         }
//         return done(null, user);
//     });
// });




// id comes from cookies
passport.deserializeUser(async function(id,done){
    console.log('user id', id);
    try{
        const user = await User.findById(id);
        return done(null, user);
    }
    catch(err){
        console.log('error in finding the user', err);
        return done(err);
    }
});

// check if the user is authenticated or not( sign-in or not)
// here we are creating a middleware why bcs to access any page url the user should be authenticated
// so middleware exist before any controller so writting code in middleware to check user is authenticated or not
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    // req.user coontains the current signed-in  user from the session-cookie and we are 
    // just sending this to the locals for the views
   /// console.log("Request.user:" , req.user);
    res.locals.user = req.user;
   /// console.log("Response user:", res.locals.user); // or "res.user" simply
    
  }
  next();
}

