const mongoose= require('mongoose');

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({

    RestaurantName: {
        type: String,
        required: [true, 'Restaurant name is required'],
    },
    Location: {
        type: String,
        required: [true, 'Location is required'],
    },
    food : {
        type: [String],
        required: [true, 'Food items are required'],
    },
    pickup: {
        type: boolean,
        default: true,
    },
    delivery: {
        type: boolean,
        default: true,
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;