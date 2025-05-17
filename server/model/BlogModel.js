const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isDoctorPost: {
        type: Boolean,
        default: false
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    content: String,
    images: [String],
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    reports: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
