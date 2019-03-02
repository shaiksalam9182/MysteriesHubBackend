exports.sendMessage = (req, res) => {

    var config = require('../configs/configs');
    var jwt = require('jsonwebtoken');
    var regModel = require('../models/register.model');
    var notificationModel = require('../models/notification.model');

    var admin = require('firebase-admin');

    // var serviceAccount = require('../configs/bestie-b017f-firebase-adminsdk-jvgre-ef03bb6b5e.json');


    // admin.initializeApp({
    //     credential:admin.credential.cert(serviceAccount)

    // })

    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'Request body is empty',
            status: 'Failed'
        })
    } else if (req.body.phone == "" || !req.body.phone) {
        return res.status(200).send({
            message: ' Phone is empty',
            status: 'Failed'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            message: 'token is empty',
            status: 'Failed'
        })
    } else if (req.body.post_id == "" || !req.body.post_id) {
        return res.status(200).send({
            message: 'post id is empty',
            status: 'Failed'
        })
    } else if (req.body.title == "" || !req.body.title) {
        return res.status(200).send({
            message: 'title is empty',
            status: 'Failed'
        })
    } else if (req.body.post_type == "" || !req.body.post_type) {
        return res.status(200).send({
            message: 'post type is empty',
            status: 'Failed'
        })
    }


    // var tokenverify = jwt.verify(req.body.token, config.secretkey);


    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            return res.status(200).send({
                message: err.name,
                status: 'Failed',
                code: '500'
            })
        }


        if (decoded.android_id == req.body.android_id) {

            var r = Math.random().toString(36).substring(7);

            var notificatoin = new notificationModel({
                notification_id: r + "_" + req.body.phone,
                title: req.body.title,
                description: req.body.description,
                type: req.body.post_type,
                type_id: req.body.post_id,
                sendTo:req.body.sendTo
            })

            notificatoin.save().then(data => {
                regModel.find({}, {
                        fcm_token: 1,
                        _id: 0
                    })
                    .then(data => {
                        var fcmtokens = data[0].fcm_token;
                        var message = {
                            notification: {
                                title: "New story posted",
                                body: req.body.title
                            },
                            data: {
                                type: req.body.post_type,
                                type_id: req.body.post_id
                            }
                        }

                        admin.messaging().sendToDevice(fcmtokens, message)
                            .then(data => {
                                res.json(data);
                            }).catch(err => {
                                res.status(200).send({
                                    message: 'Error in sending messages' + err,
                                    status: 'Failed'
                                })
                            })

                    }).catch(err => {
                        res.status(200).send({
                            message: 'unable to fetch tokens' + err,
                            status: 'Failed'
                        })
                    })
            }).catch(err => {
                res.status(200).send({
                    message: 'Unable to insert notification',
                    status: 'Failed'
                })
            })




        } else {
            return res.status(200).send({
                message: 'Invalid token. Bad request',
                status: 'Failed'
            })
        }




    })










}