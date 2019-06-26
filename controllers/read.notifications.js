var config = require('../configs/configs');
var jwt = require('jsonwebtoken');
var notificationModel = require('../models/notification.model');

exports.readNotifications = (req, res) => {

    if (!req.body.token || req.body.token == "") {
        notificationModel.find({ sendTo: "all" }).then(data => {
            res.status(200).send({
                status: 'success',
                data: data
            })
        }).catch(err => {
            return res.status(200).send({
                message: 'Unable to get notifications',
                status: 'Failed'
            })
        })
    } else {
        jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
            if (err) {
                return res.status(200).send({
                    message: err.name,
                    status: 'Failed',
                    code: '500'
                })
            }


            if (decoded.user_id == req.body.user_id) {
                notificationModel.find({ $or: [{ sendTo: req.body.email }, { sendTo: "all" }] }).then(data => {
                    res.status(200).send({
                        status: 'success',
                        data: data
                    })
                }).catch(err => {
                    return res.status(200).send({
                        message: 'Unable to get notifications',
                        status: 'Failed'
                    })
                })

            } else {
                return res.status(200).send({
                    message: 'Invalid token',
                    status: 'Failed'
                })
            }
        })
    }



}