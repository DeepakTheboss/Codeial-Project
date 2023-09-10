const User = require('../models/user')
module.exports.profile = function(req,res){
    return  res.render('userProfile', {
        title: "User Profile"
    })

}
// these are actions not the routes which u type in browser
//render the sign up page
module.exports.signUp = function(req,res){
  return res.render('user_sign_up', {
    title: "Codeial | Sign Up"
  })
}


//render the sign in page
module.exports.signIn = function(req,res){
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
              console.log('User created successfully in the database',creatingUserInDb);
              return res.redirect('/users/sign-in');

          }
          // user with the same email id already exists in database so simply redirect to the sign-up page 
          else {
              console.log('User with this email id already exists', newUser.email); 
              return res.redirect('back');
          }
      } catch (err) {
          console.error('An error occurred during user registration:', err);
          return res.redirect('/users/sign-up');
      }
  };


  // sign in and create a seesion for the user
  module.exports.createSession = async function(req, res){
    try{
         // finding the user by email
    const user = await User.findOne({email : req.body.email});
    // if user found then check whether the entered password(req.body.password) match with password in db or not.
    //if it is match then will save the user id in cookie at server side and take to profile page otherwise send them to sign-in page
    // if user not found then we can send them to sign in page.
    if(user){
      //if user found and password not match with db then redirect to sign in page
      if(user.password != req.body.password){
        console.log('Entered password is not matched with db');
        return res.redirect('back');
      }
      //handle create session of user
      // if we will user user._id then in cookie it will show in encoded 
      //but in user.id it will in decoded(normal form)
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    
    }
    // if user not found then we can send them to sign in page.
    else {
      console.log('user not found in db');
      return res.redirect('back');
    }
   
    }
    catch(err){
      console.log('error while signing in', err);
      return res.redirect('back'); //back to sign in page
    }
    
  }

  
  
