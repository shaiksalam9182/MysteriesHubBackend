const mongoose = require('mongoose');


var notification_model = mongoose.Schema({
    notification_id:String,
    title:String,
    description:String,
    type:String,
    type_id:String,
    image:String,
    sendTo:String
},{
    timestamps:true
})

module.exports = mongoose.model("Notifications",notification_model);