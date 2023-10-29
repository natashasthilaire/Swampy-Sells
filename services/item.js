const Item = require('../models/Item');
const Comment = require('../models/Comment');

exports.getItem = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        return res.status(200).json(item);

    } catch (error) {
        console.error(`The error is ${error}`)
        return res.status(500).send('Error');
    }
    
}

exports.comment = async(req, res) => {
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