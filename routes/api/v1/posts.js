const express = require('express');
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/post_api');


router.get('/',  postApi.index);
// we have set session false because we dont want to create session cookie in the browser
router.delete('/destroy/:id', (req,res,next) =>{
    console.log("Request from delete ", req);
    console.log("before auth");
    next();
},passport.authenticate('jwt',{session:false}), (req,res,next) =>{
    console.log("after auth");
    next();
}, postApi.destroy);

module.exports = router;