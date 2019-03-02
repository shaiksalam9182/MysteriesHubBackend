exports.dis_like_post = (req, res) => {
    const postmodel = require('../models/post.model');
    const jwt = require('jsonwebtoken');
    const config = require('../configs/configs');


    if (Object.keys(req).length == 0) {
        return res.status(200).send({
            message: 'Request body is empty',
            status: 'Failed'
        })
    } else if (req.body.phone == "" || !req.body.phone) {
        return res.status(200).send({
            message: 'Phone is empty',
            status: 'Failed'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            message: 'token is empty',
            status: 'Failed'
        })
    } else if (req.body.post_id == "" || !req.body.post_id) {
        return res.status(200).send({
            message: 'post_id is empty',
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

            postmodel.find({
                $and: [
                    { post_id: req.body.post_id },
                    { dis_likes: { $in: [req.body.phone] } }
                ]
            }).then(data => {
                if (Object.keys(data).length == 0) {

                    postmodel.update({ post_id: req.body.post_id }, { $push: { dis_likes: req.body.phone } })
                        .then(data => {
                            // res.json(data);
                            postmodel.find({
                                post_id: req.body.post_id
                            }, {
                                dis_likes: 1,
                                _id: 0
                            }).then(likesData => {
                                // res.json(likesData);
                                var likesarray = likesData[0].dis_likes;
                                // var likesJsonarray = JSON.parse(likesarray);
                                var likesCount = likesarray.length;
                                // res.json(likesCount);
                                postmodel.update({
                                    post_id: req.body.post_id
                                }, {
                                    $set: {
                                        dis_likes_count: likesCount
                                    }
                                }).then(data => {
                                    postmodel.find({
                                        post_id: req.body.post_id
                                    }, {
                                        dis_likes_count: 1,
                                        post_id: 1,
                                        _id: 0
                                    }).then(data => {
                                        var finaldata = data[0].toObject();
                                        finaldata.delete = 0;
                                        finaldata.status = 'success';
                                        res.json(finaldata);
                                    }).catch(err => {
                                        res.status(200).send({
                                            message: 'Error in retrieving final likes count',
                                            status: 'Failed'
                                        })
                                    })
                                }).catch(err => {
                                    res.status(200).send({
                                        message: 'Error in updating the likes count',
                                        status: 'Failed'
                                    })
                                })

                            }).catch(err => {
                                res.status(200).send({
                                    message: 'Error in getting likes data',
                                    status: 'Failed'
                                })
                            })

                        }).catch(err => {
                            res.status(200).send({
                                message: 'Error in liking the post',
                                status: 'Failed'
                            })
                        })

                } else {
                    postmodel.update({ post_id: req.body.post_id }, {
                        $pull: { dis_likes: { $in: [req.body.phone] } },
                    }).then(data => {
                        postmodel.find({ post_id: req.body.post_id }, { _id: 0, dis_likes: 1 }).then(data => {
                            var likesArray = data[0].dis_likes;
                            var likescount = likesArray.length;
                            console.log('post_id', req.body.post_id);
                            postmodel.update({
                                post_id: req.body.post_id
                            }, {
                                $set: {
                                    dis_likes_count: likescount
                                }
                            }).then(data => {
                                // res.json(data);
                                if (Object.keys(data).length == 0) {
                                    res.json(data);
                                } else {
                                    postmodel.find({ post_id: req.body.post_id }, { _id: 0, post_id: 1, dis_likes_count: 1 }).then(data => {
                                        var finaldata = data[0].toObject();
                                        finaldata.delete = 1;
                                        finaldata.status = 'success';
                                        res.json(finaldata);
                                    }).catch(err => {
                                        res.status(200).send({
                                            message: 'Error in getting the likes count',
                                            status: 'Failed'
                                        })
                                    })
                                }
                            }).catch(err => {
                                res.status(200).send({
                                    message: 'Error in updating the likes count' + err,
                                    status: 'Failed'
                                })
                            })
                        }).catch(err => {
                            res.status(200).send({
                                message: 'Error in getting likes count',
                                status: 'Failed'
                            })
                        })
                    }).catch(err => {
                        res.status(200).send({
                            message: 'Error in removing the like' + err,
                            status: 'Failed'
                        })
                    })

                }
            }).catch(err => {
                console.log('Error in checking likes status', err);
            })






        } else {
            res.status(200).send({
                message: 'Invalid token. Bad Request',
                status: 'Failed'
            })
        }




    })



}