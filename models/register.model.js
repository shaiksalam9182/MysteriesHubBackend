const mongoose = require('mongoose');

const regSchema = mongoose.Schema({
    fullname: String,
    phone: String,
    email: String,
    password: String,
    device_type: String,
    login_by: String,
    fcm_token: String,
    verified: String,
    android_id: String,
    status: String,
    user_id: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Registrations', regSchema);