const passport = require('passport');
//using passport-local strategy
const LocalStrategy = require('passport-local');

const User = require('../models/user');


/*//authenticate the  user
passport.use(new LocalStrategy({
  usernameField : 'email'  
}, function(email, password ,done){
   // finding user left email is schema and right one is 
   // value which we are getting from sign in form
    User.findOne({email: email}, function(err,user){
        if(err){
            console.log('error in finding the user');
            return done(err);  // promoting error to passport
        }
        // if user is not found  or  password not matches then same error we are showing
        if(user.password != password){
            console.log('Invalid Username/Password');
            return done(null, false); // signifies that user is not authenticated with no errors
        }

        return done(null, user);// signifies that user is authenticated with no errors
    })

    
      
   
}));
*/


// authenticate the user 
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (user.password !== password) {
          console.log('Invalid Username/Password');
          return done(null, false); // Signifies that user is not authenticated with no errors
        }

        return done(null, user); // Signifies that user is authenticated with no errors
      } catch (err) {
        console.error('Error in finding the user:', err);
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
    res.locals.user = req.user;
    
  }
  next();
}

