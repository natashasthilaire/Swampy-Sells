const express = require('express');
const { registerUser } = require('../services/register');

let router = express.Router();
router.post('/register', registerUser);

module.exports = router;
