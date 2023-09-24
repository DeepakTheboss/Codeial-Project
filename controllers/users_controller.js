 const { response } = require('express');
const User = require('../models/user');


module.exports.profile = async function(req,res){
  try{
  // receving id of user which sent from home.ejs through the string param from users routes
   const user = await User.findById(req.params.id);
   // if user found then
   if(user){
    return  res.render('userProfile', {
        title: "User Profile",
        profile_user: user 
    });
  }
  }
  catch(err){
    console.log("Error in finding the user");
  }

}

module.exports.update = async function(req, res){
  try{
     // SignedIn user can update only his/her profile 
      if(req.user.id == req.params.id){
       // console.log( "this is body:", req.body);
        const user = await User.findByIdAndUpdate(req.params.id,
          {
            name: req.body.name,
            email: req.body.email
          }, 
          { new: true });
        req.flash('success', "Profie updated successfully !!");  
        console.log("Profie updated successfully !!", user);
        console.log( "this is body:", req.body);
        return res.redirect('/');

      }
      //Signed In user updating another user profile by inspecting the update html form 
      // then he will take id of any user and replace with id of user that is coming from 
      //String params to someone else id
      //eg. /users/profile/122  (122 id of user coming from update profile form i.e string params) 
      //after changing /users/profile/344 (344 id of user which exits in db)
      //for preventing this we have written if condition
      else {
           req.flash('error', "Unauthorized");  
           return res.status(401).send('Unauthorized');
      }
  }catch(err){
      req.flash('error', err);  
      console.log("error while updating profile", err);
      return res.redirect('back') //back to home page or from where I was coming from
  }
}
// these are actions not the routes which u type in browser
 /* 
    restriction after sign-up and sign-in 
    if user sign-in already with step sign-up and sign-in and then if user put url of sign-in the 
   take that user to the profile page not to sign-up and sign-in
 */
//render the sign up page
module.exports.signUp = function(req,res){

 
  if(req.isAuthenticated()){
      return res.redirect('/users/profile');
  }
  return res.render('user_sign_up', {
    title: "Codeial | Sign Up"
  })
}


//render the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
      title: "Codeial | Sign In"
    })
  }

// actions name can be of any  but routes name should match with action in form tag


 /* get the sign up data or creating new user
 module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.log('your password and confirm password should be match');
        // user will be redirected to same sign-up page if password/cnf pass does not match
        return res.redirect('back'); 
    }

    // if user email is unique then only we will create the user in database 
    // otherwise we will simply say user with the same email id is already exists 
    // or we can redirect to same / sign-up page

    User.findOne({email: req.body.email}, function(err , newUser){
         if(err){
            console.log('While finding the email we are getting error on sign-up page',err);
            return res.redirect('/users/sign-up');
            // or return res.redirect('back');
         }

 // if user email is unique then only we will create the user in database 
         if(!newUser)  // this new user is not present in database
         {
            User.create(req.body, async function(err , createdUser){
              if(err){
                console.log('error while creating or saving the user in db', err);
                return res.redirect('back'); // return the sign-up page
              }
              
              console.log('user created successfully in database', createdUser);
              return res.redirect('/users/sign-in');
              
            })
         }
// user with the same email id already exists in database so simply redirect to the sign-up page
         else{
              console.log('User with this email id already exists',newUser.email );
              return res.redirect('back');  // sign-up page
         }
    })

  */      



//get the sign up data or creating new user  (above code is original)    
module.exports.create = async function(req, res) {
      try {
        // user will be redirected to same sign-up page if password/cnf pass does not match
          if (req.body.password != req.body.confirm_password) {
              req.flash('alert', "Your password and confirm password should match");
              console.log('Your password and confirm password should match');
              return res.redirect('back');
          }
  

    // if user email is unique then only we will create the user in database 
    // otherwise we will simply say user with the same email id is already exists 
    // or we can redirect to same / sign-up page

    //finding user by email
          const newUser = await User.findOne({ email: req.body.email });
  
          // if user email is unique then only we will create the user in database 
          // this new user is not present in database
          if (!newUser) { 
              const creatingUserInDb = await User.create(req.body);
              req.flash('success', "User created successfully in the database");
              console.log('User created successfully in the database',creatingUserInDb);
              return res.redirect('/users/sign-in');

          }
          // user with the same email id already exists in database so simply redirect to the sign-up page 
          else {
              req.flash('error', "User with this email id already exists");
              console.log('User with this email id already exists', newUser.email);
              return res.redirect('back');
          }
      } catch (err) {
          req.flash('error', err);
          console.error('An error occurred during user registration:', err);
          return res.redirect('/users/sign-up');
      }
  };
  




  // sign in and create a seesion for the user
  module.exports.createSession = function(req, res){
    //setting a flsh object into req
      req.flash('success', "Logged in succcessfully!");
      return res.redirect('/'); // back to signIn page

  }

  // sign out
  module.exports.destroySession = function(req, res){
          // before terminating the session we have to logout
          // logout() fn provided by passport.js to req
          req.logout(function(err){
            if(err){
              req.flash('error', err);
              //console.log("Error while logout", err);
            }
          });
          req.flash('success', "You have logged out!"); 
          return res.redirect('back'); ///to home page
  }
