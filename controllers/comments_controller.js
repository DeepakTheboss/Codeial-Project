const Post = require('../models/post'); // Import your Post model here
const Comment = require('../models/comment'); // Import your Comment model here

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post); // where post is name attribute of form

       if(post){
         // if post found then we are making a new comment on post
         const comment = new Comment({
            content: req.body.content,
            // here on each comment we are adding post._id as Comment Schema says
            post: req.body.post,
            user: req.user._id
        });
        // if comment created successfully then we need to add comment to the post
        if(comment){
          console.log("Comment added successfully to post", comment);
          await comment.save();
          // here on each post we are adding array of comments as Post Schema says ()

          // post we are fetching from db , comments is coming from post schema and push is func
          // comment coming from line no. 17
          post.comments.push(comment);
          await post.save();
  
          return res.redirect('/'); // back to home page
        }
        else{
            console.log("Error while making a comment on post");
        }
       }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
