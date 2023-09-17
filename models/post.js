const mongoose = require('mongoose');
// it is collection only
const postSchema = new mongoose.Schema({
    //fields
    content :{
        type:String,
        required: true
    },
    //whenever post  is going to be created thats needs to be link with user schema
    // or user will create a post in social media app simply so needs to link both(post and user)
    user: {
        type: mongoose.Schema.Types.ObjectId,  // objectid of user that it will pick from db
        ref:'User' // schema or model  name in db of User

    }

}, {
    timestamps: true
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post;