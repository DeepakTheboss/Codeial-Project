module.exports.index = function(req, res) {
    // when we are dealing with API. Req,Res all deals with JSON format
    return res.json(200, {
        message:"list of Post using v1 version",
        posts: []
    })
}