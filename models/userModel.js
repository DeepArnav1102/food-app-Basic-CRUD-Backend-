const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: [String],
         default: [],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    usertype: {
        type: String,
        required: [true, 'User type is required'],
        enum: ['customer', 'admin','driver', 'vendor'],
        default: 'customer',
    },
    profilePicture: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);