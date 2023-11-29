const express = require('express');
const { upload, postItem, getItem, comment } = require('../services/item')

let router = express.Router();
router.post('/:id', upload.single('image'), postItem);
router.get('/:id', getItem);
router.post('/:id/comment', comment);

module.exports = router;