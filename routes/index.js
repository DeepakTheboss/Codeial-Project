const express = require('express');
const router = express.Router(); // Express Router is a module
//in this file we will define all sub-routes
const homeController = require('../controllers/home_controller');
console.log("Router loaded");

//accessing the homecontroller's action
router.get('/', homeController.home);


//in this I need to tell that in userController I can write all user related API's like 
//localhost:8000/users/profile, localhost:8000/users/create-user
//so here till localhost:8000/users   we are accessing.
router.use('/users', require('./users')); //sub-routes

// sub routes for the posts
router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));
// this is sub routes
router.use('/api', require('./api'));
router.use('/auth', require('./auth'));
router.use('/likes' , require('./likes'));

module.exports = router;

