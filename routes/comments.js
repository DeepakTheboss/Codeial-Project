const express = require('express');
const router = express.Router(); // Express Router is a module
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');


// putting the on more check that if user is signedIn then only he/she 
//can create or make a post
router.post('/create',passport.checkAuthentication, commentsController.create);

module.exports = router;

