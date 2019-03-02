const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registrations = require('../models/register.model');
const configs = require('../configs/configs');


exports.login = (req, res) => {

    console.log('at login page');
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
            status: 'Failed'
        })
    } else if (req.body.device_type == "" || !req.body.device_type) {
        return res.status(200).send({
            message: 'device_type is empty',
            status: 'Failed'
        })
    } else if (req.body.fcm_token == "" || !req.body.fcm_token) {
        return res.status(200).send({
            message: 'Token is empty',
            status: 'Failed'
        })
    } else if (req.body.android_id == "" || !req.body.android_id) {
        return res.status(200).send({
            message: 'Device not supported',
            status: 'Failed'
        })
    }


    // const saltRounds = 10;
    // var encryptedPassword = "";

    if (req.body.login_by == "manual") {
        registrations.findOne({
                phone: req.body.phone
            }, {
                _id: 0,
                __v: 0
            })
            .then(data => {
                // console.log(data);
                if (Object.keys(data).length == 0) {
                    return res.status(200).send({
                        message: 'No user found',
                        status: 'Failed'
                    })
                } else {
                    var password = data.password;
                    // console.log('dbHash', password);
                    bcrypt.compare(req.body.password, password, function(err, compareRes) {
                        console.log(compareRes, err);
                        if (!compareRes) {
                            res.status(200).send({
                                message: 'Invalid Password',
                                code: '300'
                            })
                        } else {
                            if (data.verified == "Yes") {
                                const payload = {
                                    android_id: req.body.android_id
                                }
                                var token = jwt.sign(payload, configs.secretkey, {
                                    expiresIn: "365d"
                                })
                                console.log('genToken', token);

                                // console.log(data.phone);
                                var resData = data.toObject();
                                delete resData.password;
                                resData["token"] = token;
                                resData["status"] = "success";
                                resData['android_id'] = req.body.android_id;
                                console.log(resData);
                                registrations.update({
                                        phone: req.body.phone
                                    }, {
                                        $set: { fcm_token: req.body.fcm_token }
                                    })
                                    .then(data => {
                                        console.log(data);
                                    }).catch(err => {
                                        console.log(err);
                                    })
                                console.log(resData);
                                res.json(resData);
                            } else if (data.verified == "No") {
                                if (data.phone != "") {
                                    res.status(200).send({
                                        message: 'Not verified user',
                                        code: "300",
                                        data: data.phone,
                                        login_by: data.login_by

                                    })
                                } else {
                                    res.status(200).send({
                                        message: 'Not verified user',
                                        code: "300",
                                        data: data.email,
                                        login_by: data.login_by
                                    })
                                }

                            }
                        }
                    })
                }
            }).catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    } else {
        console.log('At social login');
        registrations.findOne({
            email: req.body.email
        }, {
            password: 0,
            _id: 0,
            __v: 0
        }).then(data => {
            if (data.verified == "Yes") {
                const payload = {
                    android_id: req.body.android_id
                }
                var token = jwt.sign(payload, configs.secretkey, {
                    expiresIn: "24h"
                })
                console.log('genToken', token);

                // console.log(data.phone);
                var resData = data.toObject();
                delete resData.password;
                resData["token"] = token;
                resData["status"] = "success";
                resData["android_id"] = req.body.android_id;
                registrations.updateOne({
                        email: req.body.email
                    }, {
                        $set: { fcm_token: req.body.fcm_token }
                    })
                    .then(data => {
                        console.log(data);
                    }).catch(err => {
                        console.log(err);
                    })
                res.json(resData);

            } else {
                if (data.phone != "") {
                    res.status(200).send({
                        message: 'Not verified user',
                        code: "300",
                        data: data.phone,
                        login_by: data.login_by

                    })
                } else {
                    res.status(200).send({
                        message: 'Not verified user',
                        code: "300",
                        data: data.email,
                        login_by: data.login_by
                    })
                }
            }

        }).catch(err => {
            res.status(200).send({
                message: 'No records found',
                status: 'Failed'
            })
        })
    }
}