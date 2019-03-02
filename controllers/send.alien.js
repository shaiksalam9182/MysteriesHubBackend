const alienmodel = require('../models/alien.model');
const configs = require('../configs/configs');

const jwt = require('jsonwebtoken');

exports.send_alien = (req, res) => {
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


        if (decoded.android_id == req.body.android_id) {

            var r = Math.random().toString(36).substring(7);

            var post = new alienmodel({
                alienPost_id: req.body.phone + "_" + r,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                user_published: req.body.user_published,
                published: req.body.published,
                device_type: req.body.device_type,
                post_by: req.body.phone
            })

            alienmodel.find({
                    place_id: req.body.phone + "_" + r
                })
                .then(data => {
                    console.log(data);
                    if (Object.keys(data).length == 0) {
                        post.save()
                            .then(data => {
                                var finaldata = data.toObject();
                                finaldata.status = 'success';
                                res.json(finaldata);
                            }).catch(err => {
                                res.status(200).send({
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