module.exports.profile = function(req,res){
    return  res.render('userProfile', {
        title: "User Profile"
    })

}