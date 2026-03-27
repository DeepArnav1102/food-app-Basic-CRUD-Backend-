const foodModel = require('../models/foodModel');

// function to add food
const AddFoodController = async (req,res) => { 
    try {
        const {foodName,
            description,
            price,
            category,
            code,
            available,
            foodImage,
            restaurant,
            rating} = req.body;

        if (!foodName || !description || !price || !code || !restaurant){
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        const newFood = new foodModel({foodName,
            description,
            price,
            category,
            code,
            available,
            foodImage,
            restaurant,
            rating});

        await newFood.save();
        res.status(200).send({

            success: true,
            message: "New Food added"
        })
    }
    catch (error){

        console.error("Error in AddFoodController", error.message);
        res.status(500).send({
            success: false,
            message: "Error in Add food Controller"
        })
    }
}

// function to get all food

const getAllFoodController = async(req,res) => {
    try {
        const getfood = await foodModel.find({});
        if(!getfood){
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
    catch(error){
        console.error("Error in getAllFoodController", error.message);
        res.status(500).send({
            success: false,
            message: "Error in get food controller"
        })
    }
}

// get food by name

const foodbynameController = async (req, res) => {
    try{
        const {foodName} = req.body;

        const getfood = await foodModel.findOne({foodName});
        
        if(!getfood){

            return res.status(404).send({
                success: false,
                message: "No such food is found"
            })
        }

        res.status(200).send({
            success: true,
            food : getfood
        })

    }
    catch (error){
        console.error("Error in foodbynameController", error.message);
        res.status(500).send({
            success: false,
            message: "Error in get food by name"
        })
    }
}

// delete food by id

const deletefoodController = async(req, res) => {
    try{
        const foodid = req.params.id;

        const food = await foodModel.findById(foodid);
        if(!food){
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
    catch( error ){
        console.error("Error in delete food controller", error.message);
        res.status(500).send({
            success: false,
            message: "error in delete food controller"
        })
    }

}

module.exports = {AddFoodController, getAllFoodController , foodbynameController, deletefoodController};