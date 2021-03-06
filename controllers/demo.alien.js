const alienmodel = require('../models/alien.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');



exports.demo_read_alien = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
            status: 'Failed'
        })
    } else if (req.body.android_id == "" || !req.body.android_id) {
        return res.status(200).send({
            message: 'This phone does not support guest user',
            status: 'Failed'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            message: 'token is empty',
            status: 'Failed'
        })
    } else if (req.body.skip == "" || !req.body.skip) {
        return res.status(200).send({
            message: 'skip is empty',
            status: 'Failed'
        })
    }

    // var tokenverify = jwt.verify(req.body.token, config.secretkey);


    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            return res.status(200).send({
                message: err.message,
                status: 'Failed',
                code: '500'
            })
        }


        if (decoded.android_id == req.body.android_id) {
            var skip = Number(req.body.skip);
            alienmodel.find({}, {
                    _id: 0,
                    __v: 0
                }).limit(10).skip(skip)
                .then(data => {
                    res.status(200).send({
                        status: 'success',
                        data: data
                    })
                }).catch(err => {
                    res.status(200).send({
                        message: err.message,
                        status: 'Failed'
                    })
                })

        } else {
            res.status(200).send({
                message: 'Inalid Token. Bad request',
                status: 'Failed'
            })
        }



    })






}