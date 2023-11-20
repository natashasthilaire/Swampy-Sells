//where you want to add specific function (usually calling db)
const Message = require('../models/Message'); 

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({timestamp: 1}); 
        res.json(messages); 
    } catch (err) {
        res.status(500).json({message: err.message}); 
    }
}; 

const saveMessage = async (req, res) => {
    const {sender, content} = req.body; 
    const message = new Message({sender, content}); 

    try {
        const savedMessage = await message.save(); 
        res.status(201).json(savedMessage); 
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
}; 

module.exports = {
    getMessages, 
    saveMessage,
};
