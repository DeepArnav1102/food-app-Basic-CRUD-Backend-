const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const {AddFoodController} = require("../controllers/foodController")
const {getAllFoodController} = require("../controllers/foodController")
const {foodbynameController} = require("../controllers/foodController")
const {deletefoodController} = require("../controllers/foodController")

const router = express.Router();

router.post('/add-food', authMiddleware, AddFoodController);

router.get('/get-all-food', getAllFoodController);

router.get('/get-foodbyname', foodbynameController)

router.delete('/deleteFood/:id', deletefoodController);

module.exports = router;