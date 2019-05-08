const regmodel = require('../models/register.model');
const postmodel = require('../models/post.model');
const configs = require('../configs/configs');

const jwtTokens = require('jsonwebtoken');

exports.getUserData = (req, res) => {
    //console.log('headers', req.headers);
    if (Object.keys(req).length == 0) {
        return res.status(200).send({
            message: 'Request body is empty',
            status: 'Failed'
        })
    } else if (req.body.email == "" || !req.body.email) {
        return res.status(200).send({
            message: 'Email is missing',
            status: 'Failed'
        })

    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            message: 'Token is missing',
            status: 'Failed'
        })
    }

    // var tokenverify = jwtTokens.verify(req.headers.authorization, configs.secretkey);

    jwtTokens.verify(req.body.token, configs.secretkey, function(err, decoded) {
        if (err) {
            return res.status(200).send({
                message: err.name,
                status: 'Failed',
                code: '500'
            })
        }

        if (decoded.user_id == req.body.user_id) {
            postmodel.find({
                post_by: req.body.email
            }).count().then(postcounts => {
                // console.log('postcounts', postcounts);
                regmodel.findOne({
                    email: req.body.email
                }, {
                    fullname: 1,
                    email: 1,

                }).then(data => {
                    var finalData = data.toObject();
                    finalData.post_counts = postcounts;
                    finalData.status = 'success';
                    res.json(finalData);
                }).catch(err => {
                    return res.status(200).send({
                        message: 'Unable to complete opertaion',
                        status: 'Failed'
                    })
                })
            }).catch(err => {
                return res.status(200).send({
                    message: 'Unable to complete opertaion',
                    status: 'Failed'
                })
            })


        }

    })





}