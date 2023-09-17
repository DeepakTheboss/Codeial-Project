const express = require('express');
const router = express.Router(); // Express Router is a module

const postsController = require('../controllers/post_controller');

router.post('/create', postsController.create);

module.exports = router;

