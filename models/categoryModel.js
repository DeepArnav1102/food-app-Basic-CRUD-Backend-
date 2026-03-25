const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Category title is required']
    },
    imageURL: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);