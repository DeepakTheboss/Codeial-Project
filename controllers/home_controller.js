// Posts need to be rendered on home page
const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){
    // access the cookies
    // server sending cookies back to browser
    //console.log(req.cookies);
    //changing cookies value at server side means in response(res)
    // res.cookie('user_id', 90);
    // res.cookie('something', "rinu");
    // return res.render('home', {
    //     title: "Home Page"
    // })

    try {

     // shown only posts and shown to home page   
    /* const posts = await Post.find({});
     // if all posts is fetched from db
     if(posts){
        return  res.render('home', {
            title: "Codeial | Home Page",
            posts : posts
        })
     }*/



     // populate the user of each post(mongoose populate)
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


     // finding all the user for listing all users on home page
     // and will make a link on each user name and after clicking that it will
     // go to respective profile page of user
     const users = await  User.find({});
     // if all posts is fetched from db
     if(posts){
        return  res.render('home', {
            title: "Codeial | Home Page",
            posts : posts,
            all_users : users
        })
     }
    }
    //  error while fetcching the posts from db
    catch(err){
        console.log('error in finding the posts from db', err);
        return;
    }



}

//module.exports.actionName = function(req,res){}
