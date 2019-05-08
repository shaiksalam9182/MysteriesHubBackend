var config = require('../configs/configs');
var jwt = require('jsonwebtoken');
var notificationModel = require('../models/notification.model');

exports.readNotifications = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'Request body is empty',
            status: 'Failed'
        })
    } else if (req.body.email == "" || !req.body.email) {
        return res.status(200).send({
            message: 'Email is empty',
            status: 'Failed'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            message: 'Token is empty',
            status: 'Failed'
        })
    }


    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            return res.status(200).send({
                message: err.name,
                status: 'Failed',
                code: '500'
            })
        }


        if (decoded.user_id == req.body.user_id) {
            notificationModel.find().then(data => {
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
