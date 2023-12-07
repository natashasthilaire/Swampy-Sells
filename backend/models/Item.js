const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },  
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },  
        location: {
            type: String,
            required: true
        },
        sold: {
            type: Boolean,
            required: true,
            default: false
        },
        bookmarkedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    { collection: 'items'}
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item