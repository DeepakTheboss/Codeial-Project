const express = require('express');
const router = express.Router(); // Express Router is a module
const passport = require('passport');
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);

/// route for sign up which u type in browser
router.get('/sign-up', usersController.signUp);
// rendering the sign in page only
router.get('/sign-in', usersController.signIn);

// this URL should match with action in form tag
// adding user to db or sign up after fillig the form
router.post('/create', usersController.create);


// use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession )
module.exports = router;