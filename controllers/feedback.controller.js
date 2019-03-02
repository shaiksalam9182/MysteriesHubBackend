const config = require('../configs/configs');
const feedbackModel = require('../models/feedback.model');

const jwt = require('jsonwebtoken');


exports.sendFeedback = (req, res) => {
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
    } else if (req.body.message == "" || !req.body.message) {
        return res.status(200).send({
            message: ' Message is empty',
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
                statu: 'Failed',
                code: '500'
            })
        }


        if (decoded.android_id == req.body.android_id) {
            var feedback = new feedbackModel({
                phone: req.body.phone,
                message: req.body.message,
                type: req.body.type
            })


            feedback.save()
                .then(data => {
                    var finaldata = data.toObject();
                    finaldata.status = "Success";
                    res.json(finaldata);
                }).catch(err => {
                    res.status(200).send({
                        message: 'Unable to send feedback',
                        status: 'Failed'
                    })
                })

        } else {
            res.status(200).send({
                message: 'Invalid token.Bad request',
                status: 'Failed'
            })
        }


    })




}