//export and require it in routes, put route you want
//export router and import it in index.js
//handles routing logic for sending & getting messages

const express = require('express');
const Message = require('../models/Message');

let router = express.Router();


//POST route to send a message
router.post('/messages', async (req, res) => {

    const { user, content } = req.body;

    try {
        const newMessage = new Message({ user, content });
        await newMessage.save(); //saves newMessage into database
        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

router.get('/messages', async (req, res) => {

    try {
        //fetch last 10 messages
        //sort returns them all by id in decending order
        const messages = await Message.find().sort({ _id: -1 }).limit(10);
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

module.exports = router;