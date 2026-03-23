const express = require('express');
const { getUserInfoController } = require('../controllers/usercontroller');
const { UpdateUserController } = require('../controllers/usercontroller');
const { DeleteUserController } = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authmiddleware');


const router = express.Router();

router.get('/getUser',authMiddleware, getUserInfoController);
router.put('/updateUser', authMiddleware, UpdateUserController);
router.delete('/deleteUser/:id', authMiddleware, DeleteUserController);

module.exports = router;