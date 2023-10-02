const Post = require("../models/post"); // Import your Post model here
const Comment = require("../models/comment"); // Import your Comment model here

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post); // where post is name attribute of form

    if (post) {
      // if post found then we are making a new comment on post
      const comment = new Comment({
        content: req.body.content,
        // here on each comment we are adding post._id as Comment Schema says
        post: req.body.post,
        user: req.user._id,
      });
      // if comment created successfully then we need to add comment to the post
      if (comment) {

       
        req.flash('success', "Comment added successfully to post");
        //console.log("Comment added successfully to post", comment);
        await comment.save();
        // here on each post we are adding array of comments as Post Schema says ()

        // post we are fetching from db , comments is coming from post schema and push is func
        // comment coming from line no. 17
        post.comments.push(comment);
        await post.save();
        if(req.xhr){
          return res.status(200).json({
            data :{
              comment: comment // newly created comment
            },
            message: "Comment created!"
          })
        }
        

        return res.redirect("back"); // back to home page or '/'
      } else {
        req.flash('error', "Error while making a comment on post");
        //console.log("Error while making a comment on post");
        return res.redirect("back");
      }
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect("back");
    //console.error(err);
    //return res.status(500).send("Internal Server Error");
  }
};

// deleting a comment from the post
module.exports.destroy = async function (req, res) {
  try {
    //berore deleing a comment from a post we need to check whether particular comment is exist or not from db
    const comment = await Comment.findById(req.params.id); // getting id of comment through string param
    // if commnet found then
    console.log("Comment object: ", comment);
    // comment.user is user's id
    //.id means converting the object id to string


    // apart from signed In user no one else is allowed to delete a commnet of his own and also of others(Authorization)
    //means if  comment done by user and current signed In user is same  then he/she can delete his/her comments
    // and if  comment done by another user on SignedIn user's psot and current signed In user is not same 
    // then also  signedIn user  can delete  comments of other users on his/her post

    if ((comment.user == req.user.id) || (comment.user != req.user.id) ) {
      const beforeDeletingComment = await Post.findById(comment.post);
      console.log("Before deleting a comment from post ", beforeDeletingComment.comments);
      // eg. In one post(A) there is list of comments say(comment x, y,z ...)
      // And I wanted to delete a unique comment i.e comment x
      // but an individual comment contains the post.id which is here post(A) so i will delete comment(x)
      //then it will delete the post(A) which leads to delete all the comments inside that post(A)
      // it will delete all comments(y,z) also
      //but this should not be done in real world
      //So before deleting an individual comment will store corresponding post by its id(post.id)
      

      let postId = comment.post;
      
      
      //and delete that comment
      await comment.deleteOne();
      if(req.xhr){
        return res.status(200).json({
            data: {
                comment_id: req.params.id
            },
            message: "Comment deleted"
        });
     }
      //and find that post and delete the comment that u wanted from this post
      // means simlpy updating the post
      
      // pulling an individual comment from commnets array which is present in post model
      const post = await Post.findByIdAndUpdate(postId,{ $pull: { comments: req.params.id } },{ new: true }).exec();
       
      console.log("After deleting a comment from post ", post.comments);
      // post updated
      if (post) {
        req.flash('success', "Comment removed from current post");
        console.log("Comment removed from current post");
        return res.redirect('back'); //back to home page
      } else {
        req.flash('error', "error while deleting a comment from a post");
        console.log("error while deleting a comment from a post");
        return res.redirect('back');
      }
    } else {
      req.flash('error', "Unauthorized to delete this comment");
      console.log("Unauthorized to delete this comment");
      //return res.status(401).send("Unauthorized");
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', "Error in deleting the comment");
    console.log("Error in deleting the comment", comment);
    return res.redirect('back'); //back to home page
  }
};