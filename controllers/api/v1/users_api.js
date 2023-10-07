const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});
        // If user not found  OR password not match then
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        // If user found  and password match then
        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            // user.toJSON() will be encypted using the String 'codeial'
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        })

    }catch(err){
        console.log('******', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
  }