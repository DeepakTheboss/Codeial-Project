// creating an action for create post
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {

     let post = await Post.create({
        content: req.body.content, // form data content of name attribute
        //coming from setAuthenticatedUser from localStrategy.js (binding with minimal input
        // that is user._id present in db)
        user : req.user._id });   // if user is not signed in then will not get _id
        

      post = await post.populate('user'); 
      // if post object is there then
      if(post){
        console.log("Post Object: ", post);
       
        // now recieving the form data (JSON data) using this action
        // check if the requset is AJAX or not
        if(req.xhr){
          return res.status(200).json({
            data :{
              post: post // newly created post
            },
            message: "Post created!"
          })
        }

        req.flash('success', "Post is created successfully!!");
        //console.log("Post is created successfully!!", post);
        return res.redirect('back'); //or '/',  back to the home page
      } 
    }
    // if post is null then here we have handled or any error related to post
    catch(err) {
        req.flash('error', "Error while making a post");
        //console.log("error while making a post", err); 
        return res.redirect('back');
    }
}



// deleting a post using string param(/posts/destroy/:id) where id is post of id

module.exports.destroy = async function(req, res){
  
  try{
    //berore deleing a post we need to check whether particular post is exist or not from db
    const post = await Post.findById(req.params.id); // getting id of post through string param
    // if post found then
    console.log("Post object: ", post);
    // apart from signed In user no one else is allowed to delete a post(Authorization)
    //means if  post done by user and current signed In user is same  then he/she can delete post

    // post.user is user's id
    //.id means converting the object id to string
    if(post.user == req.user.id){
       await post.deleteOne(); // post.remove() is not working in newer version

       if(req.xhr){
          return res.status(200).json({
              data: {
                  post_id: req.params.id
              },
              message: "Post deleted"
          });
       }
       // and then delete all the comments associated with that post
       const deletedComments = await Comment.deleteMany({post: req.params.id});
       if(deletedComments) {
        req.flash('success', "Post and associated comments deleted successfully");
        //console.log("Comments deleted successfully");
        return res.redirect('back') //back to home page
       }
       else{
        req.flash('error', "Error while deleting these comments from post");
        //console.log("error while deleting these comments");
       }
       
    }
    else {
      req.flash('error', "Unauthorized to delete this post");
      //console.log("Unauthorized to delete this post");
      //return res.status(401).send("Unauthorized");
      return res.redirect('back'); //back to home page
  }
  }
  catch(err){
    req.flash('error', "Error in deleting the post");
    //console.log("Error in deleting the post", post);
    return res.redirect('back'); //back to home page
  }
}
