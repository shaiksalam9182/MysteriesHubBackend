const config = require('../configs/configs');
const feedbackModel = require('../models/feedback.model');

const jwt = require('jsonwebtoken');


exports.sendFeedback = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'Request body is empty',
            status: 'Failed'
        })
    } else if (req.body.email == "" || !req.body.email) {
        return res.status(200).send({
            message: ' Email is empty',
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
    } else if(req.body.type=="" || !req.body.type){
       return res.status(200).send({
           message:'Feedback type is empty',
           status:'Failed'
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


        if (decoded.user_id == req.body.user_id) {
            var feedback = new feedbackModel({
                email: req.body.email,
                message: req.body.message,
                type: req.body.type
            })


            feedback.save()
                .then(data => {
                    var finaldata = data.toObject();
                    finaldata.status = "success";
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
