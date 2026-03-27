const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

    foodName: {
        type: String,
        required: [true, "Food name is required"]
    },

    description: {
        type: String,
        required: [true, "Food description is required"]
    },

    price: {
        type: String,
        required: [true, "Food price is required"]
    },

    category: {
        type: String,
        required: [true, "Food category is required"]
    },

    code: {
        type: String
    },

    Available: {
        type: Boolean,
        default: true
    },

    foodImage: {
        type: String
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },

    rating: {
        type: String,
        default: 3,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model("Food",foodSchema);