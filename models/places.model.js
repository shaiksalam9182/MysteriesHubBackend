const mongoose = require('mongoose');


var place_post = mongoose.Schema({
    place_id: String,
    title: String,
    description: String,
    //status: String,
    user_published: String,
    published: String,
    image: String,
    device_type: String,
    post_by: String,
    likes: Array,
    likes_count: String,
    dis_likes: Array,
    dis_likes_count: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Places', place_post);