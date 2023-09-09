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



