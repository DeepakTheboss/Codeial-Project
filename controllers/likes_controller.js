const Like = require("../models/like");
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try{
       // likes/toggle/?id=abcdef&type=Post
       let likeable;
       let deleted = false;  // deleted false means dont delete like on post or comment and vise versa
       
       // finding likeable
       if(req.query.type == 'Post'){
            // finding the counts of likes on the existing post
            // if post contains the others users likes
            // bcs a newly created post have 0 likes
            likeable = await Post.findById(req.query.id).populate('likes'); 
       }else{
             // finding the counts of likes on the existing comment
            // if comment contains the others users likes
            // bcs a newly created comment have 0 likes
            likeable = await Comment.findById(req.query.id).populate('likes');
       }
       // to check if a like already exists
       let existingLike = await Like.findOne({   // one user can like once on post or comment 
        likeable: req.query.id,
        onModel: req.query.type,
        user: req.user._id
       });
       // if a like already exists then delete it
       //1. first removing like from the likeable objects(Post Or Comment)
       // means if like is on post then need to pull out likes from post then delete that like object.
       if(existingLike) {
        likeable.likes.pull(existingLike._id);
        likeable.save();
        existingLike.remove();
        //Says like deleted from likebale object
        deleted  = true;

       }else{
        // make new like
        let newLike = await Like.create({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });  
        // now we have to add newly created like on Post or comment which contains likes array (as Schema says)
        likeable.likes.push(newLike._id);
        likeable.save(); 

       }


       return res.json(200, {
         message: "Request Succesfull !!",
         data : {
            deleted : deleted
         }
       })




    }catch(err){
        console.log(err);
        // like is going to work with AJAX request hence returning json, not writing req.flash("message")
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}