const mongoose = require('mongoose');

const updateSchema = mongoose.Schema({
    update_version: String,
    update_note_one: String,
    update_note_two: String,
    update_note_three: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Updates', updateSchema);