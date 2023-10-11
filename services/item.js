const Item = require('../models/Item');

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