const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        image: {
            type: Buffer,
            contentType: String,
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
            requried: true
        },  
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }  
    },
    { collection: 'items'}
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item