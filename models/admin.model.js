const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    user_id: String,
    admin_role: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('admin', adminSchema);