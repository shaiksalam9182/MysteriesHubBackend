const placemodel = require('../models/post.model');
const configs = require('../configs/configs');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

exports.send_post = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
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
    } else if (req.body.title == "" || !req.body.title) {
        return res.status(200).send({
            message: 'title is empty',
            status: 'Failed'
        })
    } else if (req.body.description == "" || !req.body.description) {
        return res.status(200).send({
            message: 'description is empty',
            status: 'Failed'
        })
    }


    // var tokenverify = jwt.verify(req.body.token, configs.secretkey);

    jwt.verify(req.body.token, configs.secretkey, function(err, decoded) {
        if (err) {
            return res.status(200).send({
                message: err.name,
                status: 'Failed',
                code: '500'
            })
        }

        if (decoded.user_id == req.body.user_id) {

            var r = Math.random().toString(36).substring(18);

            var post = new placemodel({
                post_id: r,
                title: req.body.title,
                description: req.body.description,
                user_published: req.body.user_published,
                published: '0',
                image: req.body.image,
                // status: req.body.status,
                // img_one: req.body.img_one,
                // img_two: req.body.img_two,
                // img_three: req.body.img_three,
                // img_four: req.body.img_four,
                device_type: req.body.device_type,
                post_by: req.body.email
            })

            placemodel.find({
                    post_id: req.body.email + "_" + r
                })
                .then(data => {
                    console.log(data);
                    if (Object.keys(data).length == 0) {
                        post.save()
                            .then(data_final => {
                                console.log(data_final);
                                var finaldat = data_final.toObject();
                                finaldat.status = "success";
                                res.json(finaldat);
                            }).catch(err => {
                                res.status(400).send({
                                    message: 'Error in posting',
                                    status: 'Failed'
                                })
                            })
                    } else {
                        res.status(200).send({
                            message: 'Sorry, We have a problem in sending your post. We will resolve it and ping you back as early as possible',
                            status: 'Failed'
                        })
                    }
                }).catch(err => {
                    res.status(200).send({
                        message: 'Error in sending your post',
                        status: 'Failed'
                    })
                })
        } else {
            res.status(200).send({
                message: 'Invalid token. Bad request',
                status: 'Failed'
            })
        }


    })


}
