const express = require('express');
const { getItem, comment } = require('../services/item')

let router = express.Router();
router.get('/:id', getItem);
router.post('/:id/comment', comment);

module.exports = router;