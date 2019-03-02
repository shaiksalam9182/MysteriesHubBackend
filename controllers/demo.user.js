const regModel = require('../models/register.model');
const configs = require('../configs/configs');
const jwt = require('jsonwebtoken');



exports.demo_user = (req, res) => {
    console.log('requestBody', req.body, "request body");
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
            status: 'Failed'
        })
    } else if (req.body.device_type == "" || !req.body.device_type) {
        return res.status(200).send({
            message: 'device type is empty',
            status: 'Failed'
        })
    } else if (req.body.android_id == "" || !req.body.android_id) {
        return res.status(200).send({
            message: 'android id is missing',
            status: 'Failed'
        })
    } else if (req.body.fcm_token == "" || !req.body.fcm_token) {
        return res.status(200).send({
            message: 'Fcm Token is missing',
            status: 'Failed'
        })
    }



    regModel.findOne({ android_id: req.body.android_id }).then(data => {
        if (data != undefined || data != null) {
            jwt.verify(req.body.token, configs.secretkey, function(err, decoded) {
                if (err) {
                    const payload = {
                        android_id: req.body.android_id
                    }
                    var token = jwt.sign(payload, configs.secretkey, {
                        expiresIn: "365d"
                    })
                    console.log('genToken', token);
                    return res.status(200).send({
                        status: 'success',
                        token: token,
                        android_id: req.body.android_id
                    })
                } else {
                    return res.status(200).send({
                        status: 'success',
                        token: req.body.token,
                        android_id: req.body.android_id
                    })
                }



            })
        } else {
            register(req, res);
        }
    }).catch(err => {
        console.log(err);
        return res.status(200).send({
            message: 'Error Occured',
            status: 'Failed'
        })
    })


}

function register(req, res) {


    const reg = new regModel({
        android_id: req.body.android_id,
        fcm_token: req.body.fcm_token
    })


    reg.save()
        .then(data => {
            console.log('genToken', data);
            const payload = {
                android_id: req.body.android_id
            }
            var token = jwt.sign(payload, configs.secretkey, {
                expiresIn: "365d"
            })
            return res.status(200).send({
                status: 'success',
                token: token,
                android_id: req.body.android_id
            })
        }).catch(err => {
            res.status(200).send({
                message: err.message,
                status: 'Failed'
            })
        })

}