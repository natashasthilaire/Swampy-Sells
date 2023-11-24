const Item = require('../models/Item');
const Comment = require('../models/Comment');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postItem = async(req, res) => {
    console.log('Post Item Called')
    console.log(req.body);
    const imageBuffer = req.file.buffer;
    try {
        const newItem = new Item(
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
        await newItem.save();
        res.status(200).json(Item);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
}

const getItem = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        return res.status(200).json(item);

    } catch (error) {
        console.error(`The error is ${error}`)
        return res.status(500).send('Error');
    }
    
}

const comment = async(req, res) => {
    const itemId = req.params.id;
    const commentData = req.body;
    try {
        const newComment = new Comment(
            {
                text: commentData.text,
                item: itemId,
            }
        )
        newComment.save();
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }

}

module.exports = { upload, postItem,  getItem, comment};