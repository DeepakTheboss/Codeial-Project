const Post = require('../../../models/post')
const Comment = require('../../../models/comment');  
module.exports.index = async function(req, res) {

    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    // poulate the comments and author of comments
    .populate({
       path:'comments',
       populate: {
           path: 'user'
       }
    }).exec();
    // when we are dealing with API. Req,Res all deals with JSON format
    return res.json(200, {
        message:"list of Post using v1 version",
        posts: posts
    })
}

module.exports.destroy = async function(req ,res){
  
    try{

      //berore deleing a post we need to check whether particular post is exist or not from db
      const post = await Post.findById(req.params.id); // getting id of post through string param

      //We are deleting a post without authencticating a user simply means we have not logged in 
      // postman via its appropritae URL , so i.e why in req user info will not present(req.user.id
      //  will give undefined)
      // so we commented below line and removed req.flash lines

      //if(post.user == req.user.id){

        // till here we are authencticating user vis broswer and stores user info in cookie file
      // in next will authenticate user via postman using JWT because, API's do not have cookies
         await post.deleteOne(); // post.remove() is not working in newer version
  
         // and then delete all the comments associated with that post
         const deletedComments = await Comment.deleteMany({post: req.params.id});
         if(deletedComments) {
            //req.flash('success', "Post and associated comments deleted successfully");
          return res.json(200, {
            message: "Post and associated comments deleted successfully!"
          });
         }
        
      }
    catch(err){
            return res.json(500, {
                message: "Internal Server Error"
            });
    }
  }