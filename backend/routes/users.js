//user.js in routes
const User = require('../models/User');
const express = require('express'); 
const router = express.Router(); 
// router.get("/usertest", (req, res) => {
//     res.send("user test is good!")
// })


router.get("/:userId", async(req, res) => {
    const userId = req.params.userId; 
    console.log(userId); 
    try {
        const user = await User.findById(userId);
        res.status(200).json(user); 
    } catch(error) {
        console.error(error)
        res.status(400).send('error'); 
    }
});


module.exports = router;