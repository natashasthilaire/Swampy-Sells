const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
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
    { collection: 'listings'}
);

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;