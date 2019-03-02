const regModel = require('../models/register.model');

exports.update_verify = (req, res) => {
    if (req.body.login_by == "google" || req.body.login_by == "facebook") {
        regModel.update({
            email: req.body.email
        }, {
            $set: {
                verified: req.body.verified,
                phone: req.body.phone
            }
        }).then(data => {
            res.status(200).send({
                message: 'Successfully verified.Thank you',
                code: '302'
            })
        }).catch(err => {
            res.status(200).send({
                message: 'Error in verification.Please try later',
                code: '303'
            })
        })
    } else {
        regModel.update({
            phone: req.body.phone
        }, {
            $set: {
                verified: req.body.verified,
                phone: req.body.phone
            }
        }).then(data => {
            res.status(200).send({
                message: 'Successfully verified.Thank you',
                code: '302'
            })
        }).catch(err => {
            res.status(200).send({
                message: 'Error in verification.Please try later',
                code: '303'
            })
        })
    }

}