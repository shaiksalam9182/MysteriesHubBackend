const mongoose = require('mongoose');


const movieModel = mongoose.Schema({
    movie_id: String,
    title: String,
    description: String,
    image: String,
    user_published: String,
    published: String,
    device_type: String,
    post_by: String,
    likes: Array,
    likes_count: String,
    dis_likes: Array,
    dis_likes_count: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Movies', movieModel);