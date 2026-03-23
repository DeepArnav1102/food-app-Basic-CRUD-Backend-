const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");

// get user info
const getUserInfoController = async (req, res) => {
   try {
        const userId = req.body.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send(
                {success: false,
                message: 'User not found' });
        }
        res.status(200).send(
            {success: true,
            message: 'User info retrieved successfully',
            user });
   }
   catch (error) {
         console.error('Error in getUserInfoController:', error.message);
         res.status(500).send(
            {success: false,
            message: 'Server Error' });
   }
}

// update user info
const UpdateUserController = async (req, res) => {
    try {
        const userId = req.body.id;
        const { username, address,password } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send(
                {success: false,
                message: 'User not found' });
        }
        if(username) user.username = username;
        if(address) user.address = address;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        await user.save();
        res.status(200).send(
            {success: true,
            message: 'User info updated successfully',
            user });
    }
    catch (error) {
        console.error('Error in UpdateUserController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
}

// delete user account
const DeleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send(
                {success: false,
                message: 'User not found' });
        }
        await userModel.findByIdAndDelete(userId);
        res.status(200).send(
            {success: true,
            message: 'User account deleted successfully' });
    }
    catch (error) {
        console.error('Error in DeleteUserController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
}


module.exports = { getUserInfoController, UpdateUserController, DeleteUserController };