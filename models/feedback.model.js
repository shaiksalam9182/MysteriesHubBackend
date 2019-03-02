const mongoose = require('mongoose');

var feedback = mongoose.Schema({
    phone: String,
    message: String,
    type: String
}, {
    timestamps: true
})

module.exports = mongoose.model("Feedback", feedback);