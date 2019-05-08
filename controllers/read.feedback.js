const feedbackmodel = require('../models/feedback.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');

exports.readFeedback = (req, res) => {

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

        if (decoded.user_id == req.body.user_id) {
            feedbackmodel.find({}, {
                    _id: 0,
                    __v: 0
                })
                .then(data => {
                    res.json(data);
                }).catch(err => {
                    return res.status(200).send({
                        message: 'Unable to read feedback',
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