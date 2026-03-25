const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const {createCatcontroller} = require('../controllers/categoryController');
const {getAllCatController} = require('../controllers/categoryController');
const {updateCatController} = require('../controllers/categoryController');
const {deleteCatController} = require('../controllers/categoryController');


router = express.Router();

router.post('/create-category', authMiddleware, createCatcontroller);
router.get('/get-all-categories', getAllCatController);
router.put('/update-category', authMiddleware, updateCatController);
router.delete('/delete-category/:id', authMiddleware, deleteCatController);

module.exports = router;