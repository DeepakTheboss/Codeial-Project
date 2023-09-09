const express = require('express');
const router = express.Router(); // Express Router is a module

const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);

/// route for sign up which u type in browser
router.get('/sign-up', usersController.signUp);
// rendering the sign in page only
router.get('/sign-in', usersController.signIn);

// this URL should match with action in form tag
// adding user to db or sign up after fillig the form
router.post('/create', usersController.create);

router.post('/create-session', usersController.createSession);

module.exports = router;