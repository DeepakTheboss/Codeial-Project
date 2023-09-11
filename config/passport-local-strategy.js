const passport = require('passport');
//using passport-local strategy
const LocalStrategy = require('passport-local');

const User = require('../models/user');


//authenticate the  user
passport.use(new LocalStrategy({
  usernameField : 'email'  
}, function(email, password ,done){
    //finding user left email is schema and right one is 
    //value which we are getting from sign in form
    User.findOne({email: email}, function(err,user){
        if(err){
            console.log('error in finding the user');
            return done(err);  // promoting error to passport
        }
        // if user is not found  or  password not matches then same error we are showing
        if(!user || user.password != password){
            console.log('Invalid Username/Password');
            return done(null, false); // signifies that user is not authenticated with no errors
        }

        return done(null, user);// signifies that user is authenticated with no errors
    })
}));



//serialize the user (saving the key to cookies in encrypted form)
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserialize the user when the new request comes from browser
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding the user');
            return done(err);
        }
        return done(null, user);
    });
});


