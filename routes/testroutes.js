// router for testing the server
const express = require('express');
const { testcontroller } = require('../controllers/testcontroller');

// Creating a router instance
const router = express.Router();

// Defining a test route
router.get('/test-controller', testcontroller);

// Exporting the router to be used in the main application
module.exports = router;