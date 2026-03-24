const express= require('express');
const { createRestaurantController } = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/authmiddleware');
const { deleteRestaurantController } = require('../controllers/restaurantController');
const { updateRestaurantController } = require('../controllers/restaurantController');
const {getRestaurantController} = require('../controllers/restaurantController');



const router = express.Router();

router.post('/create-restaurant', authMiddleware , createRestaurantController);
router.put('/update-restaurant', authMiddleware , updateRestaurantController);
router.delete('/delete-restaurant/:id', authMiddleware , deleteRestaurantController);
router.get('/get-restaurant', authMiddleware , getRestaurantController);
module.exports = router;

