const express = require('express');
const { getUserInfoController } = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authmiddleware');


const router = express.Router();

router.get('/getUser',authMiddleware, getUserInfoController);

module.exports = router;