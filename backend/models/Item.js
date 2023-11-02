const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: String,   
    },
    { collection: 'items'}
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item