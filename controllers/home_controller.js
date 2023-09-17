// Posts need to be rendered on home page
const Post = require('../models/post');



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
     const posts = await Post.find({}).populate('user').exec();
     // if all posts is fetched from db
     if(posts){
        return  res.render('home', {
            title: "Codeial | Home Page",
            posts : posts
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
