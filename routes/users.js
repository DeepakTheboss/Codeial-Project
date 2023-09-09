const express = require('express');
const router = express.Router(); // Express Router is a module

const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);

/// route for sign up which u type in browser
router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

module.exports = router;