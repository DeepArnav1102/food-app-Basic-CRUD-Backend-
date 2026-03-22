const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// register user
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Basic validation
        if (!username || !email || !password || !phone) {
            return res.status(400).send(
                {success: false,
                message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send(
                {success: false,
                message: 'Username already exists' });
        }

        // check if email already exists
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send(
                {success: false,
                message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({ username, email, password: hashedPassword, phone });
        await newUser.save();
        res.status(201).send(
            {success: true,
            message: 'User registered successfully',
            user: newUser });
        console.log('User registered successfully');

    }
    catch (error) {
        console.error('Error in registerController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
}

// Login user

const loginController = async (req, res) => {

    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).send(
                {success: false,
                message: 'Username and password are required' });
        }

        // Check if user exists
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).send(
                {success: false,
                message: 'Invalid username' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_key, { expiresIn: '1d' });
        if (!isMatch) {
            return res.status(400).send(
                {success: false,
                message: 'Invalid password' });
        }

        res.status(200).send(
            {success: true,
            message: 'User logged in successfully',
            jwtToken,
            });

    }
    catch (error) {
        console.error('Error in loginController:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
}

module.exports = { registerController, loginController };