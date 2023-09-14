// module.exports.home = function(req, res){
//     return res.end('<h1>This is home controller</h1>');
// }


module.exports.home = function(req, res){
    // access the cookies
    console.log(req.cookies);
    //changing cookies value at server side means in response(res)
    // res.cookie('user_id', 90);
     res.cookie('something', "rinu");
    return res.render('home', {
        title: "Home Page"
    })
}

//module.exports.actionName = function(req,res){}
