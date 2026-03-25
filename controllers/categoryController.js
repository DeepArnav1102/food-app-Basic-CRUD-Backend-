const Category = require('../models/categoryModel');

// create category controller
const createCatcontroller = async (req, res) => {
    try{
        const { title, imageURL } = req.body;
        if(!title){
            return res.status(400).send({
                success: false,
                message: 'Category title is required'
            }) 
        }
        const existingCategory = await Category.findOne({title});
        if(existingCategory){
            return res.status(400).send({
                success: false,
                message: 'Category already exists'
            })
        }
        const category = new Category({ title, imageURL });
        await category.save();
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            category
        })
        console.log("Category created successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating category'
        })
    }
}

// get all categories controller
const getAllCatController = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No categories found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Categories retrieved successfully',
            numberOfCategories: categories.length,
            categories: categories.map(cat => cat.title),
            id: categories.map(cat => cat._id)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving categories'
        });
    }
};

// update category controller
const updateCatController = async (req, res) => {
    try {
        const { title, newTitle } = req.body;
        if (!title || !newTitle) {
            return res.status(400).send({
                success: false,
                message: 'Category title and new title are required'
            });
        }
        const category = await Category.findOne({ title });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        category.title = newTitle;
        await category.save();
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating category'
        });
    }
}

// delete category controller
const deleteCatController = async (req, res) => {
    try {
        const catId = req.params.id;
        if (!catId) {
            return res.status(400).send({
                success: false,
                message: 'Category ID is required'
            });
        }
        const category = await Category.findById(catId);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        await Category.findByIdAndDelete(catId);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting category'
        });
    }
}
module.exports = { createCatcontroller, getAllCatController, updateCatController,deleteCatController };