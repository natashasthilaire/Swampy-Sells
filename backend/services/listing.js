const Listing = require('../models/Listing');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postListing = async(req, res) => {
    console.log(' Create Post/ Listing Called')
    console.log(req.body);
    const imageBuffer = req.file.buffer;
    try {
        const newListing = new Listing(
            {
                image: imageBuffer,
                title: req.body.title, 
                price: req.body.price, 
                category: req.body.category, 
                condition: req.body.condition, 
                description: req.body.description
                // TODO userID
            }
        )
        await newListing.save();
        res.status(200).json(Listing);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
}

const getListings = async (req, res) => {
    console.log('get Listing called')
};

module.exports = { upload, postListing,  getListings};