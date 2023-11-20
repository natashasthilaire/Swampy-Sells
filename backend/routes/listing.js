const express = require('express');
const { postListing, getListings, upload } = require('../services/listing')

let router = express.Router();
router.post('/listing', upload.single('image'), postListing);
router.get('/listing', getListings);

module.exports = router;