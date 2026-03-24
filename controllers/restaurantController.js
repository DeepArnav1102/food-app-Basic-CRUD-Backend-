const restaurantModel = require('../models/restaurantModel');

// Create Restaurant
const createRestaurantController = async (req, res) => {
    try {
        const { RestaurantName, Location, food, pickup, delivery } = req.body;

        // Basic validation
        if (!RestaurantName || !Location || !food) {
            return res.status(400).send(
                {success: false,
                message: 'Name, location and food items are required' });
        }
        // Create new restaurant
        const newRestaurant = new restaurantModel({ RestaurantName, Location, food, pickup, delivery });
        await newRestaurant.save();
        res.status(201).send(
            {success: true,
            message: 'Restaurant created successfully'
             });
        console.log('Restaurant created successfully');
    }
    catch (error) {
        console.error('Error in createRestaurantController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
};

// update restaurant
const updateRestaurantController = async (req, res) => {
    try{
        const {food, pickup, delivery} = req.body;
        const RestaurantName = req.body.RestaurantName;
        const restaurant = await restaurantModel.findOne({RestaurantName });
        if(!restaurant){
            return res.status(404).send(
                {success: false,
                message: 'Restaurant not found' });
        }
        restaurant.food = food || restaurant.food;
        restaurant.pickup = pickup ;
        restaurant.delivery = delivery;
        await restaurant.save();
        res.status(200).send(
            {success: true,
            message: 'Restaurant updated successfully'
             });
    }
    catch (error) {
        console.error('Error in updateRestaurantController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
};

// delete restaurant
const deleteRestaurantController = async (req, res) => {
    try {
        const Restaurantid = req.params.id;
        const restaurant = await restaurantModel.findById(Restaurantid);
        if (!restaurant) {
            return res.status(404).send(
                {success: false,
                message: 'Restaurant not found' });
        }
        await restaurantModel.findByIdAndDelete(Restaurantid);
        res.status(200).send(
            {success: true,
            message: 'Restaurant deleted successfully'
             });
    }
    catch (error) {
        console.error('Error in deleteRestaurantController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
};

// get restaurant info

const getRestaurantController = async (req, res) => {
    try{
        const RestaurantName = req.body.RestaurantName;
        const restaurant = await restaurantModel.findOne({RestaurantName });
        if(!restaurant){
            return res.status(404).send(
                {success: false,
                message: 'Restaurant not found' });
        }
        res.status(200).send(
            {success: true,
            message: 'Restaurant found',
            data: restaurant
             });

    }
    catch (error) {
        console.error('Error in getRestaurantController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
}


module.exports = { createRestaurantController, updateRestaurantController, deleteRestaurantController, getRestaurantController };