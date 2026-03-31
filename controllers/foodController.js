const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');

// function to add food
const AddFoodController = async (req, res) => {
    try {
        const { foodName,
            description,
            price,
            category,
            code,
            available,
            foodImage,
            restaurant,
            rating } = req.body;

        if (!foodName || !description || !price || !code || !restaurant) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        const newFood = new foodModel({
            foodName,
            description,
            price,
            category,
            code,
            available,
            foodImage,
            restaurant,
            rating
        });

        await newFood.save();
        res.status(200).send({

            success: true,
            message: "New Food added"
        })
    }
    catch (error) {

        console.error("Error in AddFoodController", error.message);
        res.status(500).send({
            success: false,
            message: "Error in Add food Controller"
        })
    }
}

// function to get all food

const getAllFoodController = async (req, res) => {
    try {
        const getfood = await foodModel.find({});
        if (!getfood) {
            return res.status(404).send({
                success: false,
                message: "no food item are found"
            })
        }

        res.status(200).send({
            success: true,
            totalfood: getfood.length,
            getfood
        })

    }
    catch (error) {
        console.error("Error in getAllFoodController", error.message);
        res.status(500).send({
            success: false,
            message: "Error in get food controller"
        })
    }
}

// get food by name

const foodbynameController = async (req, res) => {
    try {
        const { foodName } = req.body;

        const getfood = await foodModel.findOne({ foodName });

        if (!getfood) {

            return res.status(404).send({
                success: false,
                message: "No such food is found"
            })
        }

        res.status(200).send({
            success: true,
            food: getfood
        })

    }
    catch (error) {
        console.error("Error in foodbynameController", error.message);
        res.status(500).send({
            success: false,
            message: "Error in get food by name"
        })
    }
}

// delete food by id

const deletefoodController = async (req, res) => {
    try {
        const foodid = req.params.id;

        const food = await foodModel.findById(foodid);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with that id"
            })
        }
        await foodModel.findByIdAndDelete(foodid);
        res.status(200).send({
            success: true,
            message: "Food deleted succesfully"
        })
    }
    catch (error) {
        console.error("Error in delete food controller", error.message);
        res.status(500).send({
            success: false,
            message: "error in delete food controller"
        })
    }

}

// place order

const placeorderController = async (req, res) => {

    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "Please enter food cart or payment method"
            })
        }
        let total = 0;
        cart.map((i) => {

            total += parseInt(i.price);
        })

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        })

        await newOrder.save();

        res.status(200).send({
            success: true,
            message: "Order placed successfully",
            newOrder
        })

    }
    catch (error) {

        console.log("Error in place order Controller", error.message);
        res.status(500).send({
            success: false,
            message: "Error in place order Controller"
        })
    }
};

// change order status
const orderStatusController = async (req,res) =>{
    try{
        const orderId = req.params.id;
        const {status} = req.body;

        const checkID = await orderModel.findById(orderId);

        if(!checkID){

            return res.status(404).send({
                message: false,
                message: "No order found"
            })
        }
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{returnDocument: 'after'});
        res.status(200).send({
            success: true,
            message: "order status updatd"
        })
    }
    catch (error){
        console.error("Error in Order Status Controller", error.message);
        res.status(400).send({
            success: false,
            message: "Error in order status Controller"
        })
    }
}

module.exports = { AddFoodController,
    getAllFoodController,
    foodbynameController,
    deletefoodController,
    placeorderController,
    orderStatusController };