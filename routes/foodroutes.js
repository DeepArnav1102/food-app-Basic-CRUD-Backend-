const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const { AddFoodController, placeorderController, orderStatusController } = require("../controllers/foodController")
const { getAllFoodController } = require("../controllers/foodController")
const { foodbynameController } = require("../controllers/foodController")
const { deletefoodController } = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminmiddleware");

const router = express.Router();

router.post('/add-food', authMiddleware, AddFoodController);

router.get('/get-all-food', getAllFoodController);

router.get('/get-foodbyname', foodbynameController)

router.delete('/deleteFood/:id', deletefoodController);

// place order
router.post('/place-order', authMiddleware, placeorderController);

// order status change
router.post('/orderStatus/:id', authMiddleware, adminMiddleware , orderStatusController)

module.exports = router;