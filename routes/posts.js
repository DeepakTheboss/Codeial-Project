const express = require('express');
const router = express.Router(); // Express Router is a module
const passport = require('passport');

const postsController = require('../controllers/post_controller');


// putting the on more check that if user is signedIn then only he/she 
//can create or make a post
router.post('/create',passport.checkAuthentication, postsController.create);

// deleting post url
router.get('/destroy/:id',passport.checkAuthentication, postsController.destroy);


module.exports = router;

