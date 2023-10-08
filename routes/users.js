const express = require('express');
const router = express.Router(); // Express Router is a module
const passport = require('passport');
const usersController = require('../controllers/users_controller');
// before going to profile url acsess the you have to logged-in  firs the sign-in
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

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
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// this is given by passport /users/auth/google, this is not callback URL
// scope what all things we wanted to fetch from google like profile, email(as not a part of profile)
//so we need to request seperatly for email
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// if callback works suuccessfully then it will passed through the middleware of google authentication
//  then runs createSession action of usercontroller which simply return to homepage
router.get('/auth/google/callback', passport.authenticate('google',
{failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;