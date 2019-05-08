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
    } else if (req.body.email == "" || !req.body.email) {
        return res.status(200).send({
            message: 'E-mail is empty',
            status: 'Failed'
        })

    } else if (req.body.password == "" || !req.body.password) {
        return res.status(200).send({
            message: 'Password is empty',
            status: 'Failed'
        })
    }


        registrations.findOne({
                email: req.body.email
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
                                const payload = {
                                    user_id: data.user_id
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
                                if (req.body.fcm_token == "" || !req.body.fcm_token) {
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
                                }
                                res.json(resData);
                        }
                    })
                }
            }).catch(err => {
                res.status(200).send({
                    message: err.message
                })
            })
    
    
}