const usermodel = require('../models/register.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');

exports.list_users = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            status: 'Failed',
            message: 'request body is empty'
        })
    } else if (req.body.user_id == "" || !req.body.user_id) {
        return res.status(200).send({
            status: 'Failed',
            message: 'user id is empty'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            status: 'Failed',
            message: 'Token is empty'
        })
    }



    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            return res.status(200).send({
                status: 'Failed',
                message: err.message
            })
        }

        if (decoded.user_id == req.body.user_id) {
            usermodel.find().then(data => {
                return res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                return res.status(200).send({
                    message: err.message,
                    status: 'Failed'
                })
            })
        } else {
            return res.status(200).send({
                message: 'Tokens are mis matching',
                status: 'Failed'
            })
        }



    })
}