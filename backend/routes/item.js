const express = require('express');
const { upload, postItem, getItem, comment, getUserItems } = require('../services/item')
const { searchProductController } = require('../controllers/productController')

let router = express.Router();
router.post('/:id', upload.single('image'), postItem);
router.get('/:id', getItem);
router.post('/:id/comment', comment);
router.get('/search/:keyword', searchProductController)
router.get('/:id/userItems/:userId', getUserItems);

module.exports = router;