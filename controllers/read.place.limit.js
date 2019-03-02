const placeModel = require('../models/places.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');



exports.read_places_limit = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
            status: 'Failed'
        })
    } else if (req.body.phone == "" || !req.body.phone) {
        return res.status(200).send({
            message: 'phone is empty',
            status: 'Failed'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            message: 'token is empty',
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
            // var skip = Number(req.body.skip);
            placeModel.find({}, {
                    _id: 0,
                    __v: 0
                }).limit(10)
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
            res.status(400).send({
                message: 'Inalid Token. Bad request'
            })
        }



    })





}