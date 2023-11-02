const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }
    
}, { collection: 'comments '}
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;