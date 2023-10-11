const express = require('express');
const { getItem } = require('../services/item')

let router = express.Router();
router.get('/:id', getItem);

module.exports = router;