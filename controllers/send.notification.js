const notificationModel = require('../models/notification.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');
const random = require('randomstring');

exports.sendNotification = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        sendFailedResponse(req, res, "Request body is empty")
    } else if (req.body.user_id == "" || !req.body.user_id) {
        sendFailedResponse(req, res, "User id is empty");
    } else if (req.body.token == "" || !req.body.token) {
        sendFailedResponse(req, res, "Token is empty")
    } else if (req.body.type == "" || !req.body.type) {
        sendFailedResponse(req, res, "Type is empty");
    } else if (req.body.type_id == "" || !req.body.type_id) {
        sendFailedResponse(req, res, "Type id is empty");
    } else if (req.body.title == "" || !req.body.title) {
        sendFailedResponse(req, res, "Title is empty");
    } else if (req.body.description == "" || !req.body.description) {
        sendFailedResponse(req, res, "Description is empty");
    } else if (req.body.send_to == "" || !req.body.send_to) {
        sendFailedResponse(req, res, "Send to is empty");
    }


    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            sendFailedResponse(req, res, err.message)
        }

        if (decoded.user_id == req.body.user_id) {
            var notification = new notificationModel({
                notification_id: random.generate(7),
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                type_id: req.body.type_id,
                sendTo: req.body.send_to
            })

            notification.save().then(data => {
                return res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                sendFailedResponse(req, res, err.message);
            })
        } else {
            sendFailedResponse(req, res, "Invalid token");
        }


    })




}

function sendFailedResponse(req, res, message) {
    return res.status(200).send({
        message: message,
        status: 'Failed'
    })
}