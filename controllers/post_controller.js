// creating an action for create post
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {

     const post = await Post.create({
        content: req.body.content, // form data content of name attribute
        //coming from setAuthenticatedUser from localStrategy.js (binding with minimal input
        // that is user._id present in db)
        user : req.user._id });
      // if post object is there then
      if(post){
        console.log("Post is created successfully!!", post);
        return res.redirect('back'); //or '/',  back to the home page
      } 
    }
    // if post is null then here we have handled or any error related to post
    catch(err) {
        console.log("error while creating a post", err); 
        return;
    }
}
