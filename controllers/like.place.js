exports.like_place = (req, res) => {
    const postmodel = require('../models/places.model');
    const jwt = require('jsonwebtoken');
    const config = require('../configs/configs');


    if (Object.keys(req).length == 0) {
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
    } else if (req.body.place_id == "" || !req.body.place_id) {
        return res.status(200).send({
            message: 'place_id is empty',
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

            postmodel.find({
                $and: [
                    { place_id: req.body.place_id },
                    { likes: { $in: [req.body.email] } }
                ]
            }).then(data => {
                if (Object.keys(data).length == 0) {

                    postmodel.update({ place_id: req.body.place_id }, { $push: { likes: req.body.email } })
                        .then(data => {
                            // res.json(data);
                            postmodel.find({
                                place_id: req.body.place_id
                            }, {
                                likes: 1,
                                _id: 0
                            }).then(likesData => {
                                // res.json(likesData);
                                var likesarray = likesData[0].likes;
                                // var likesJsonarray = JSON.parse(likesarray);
                                var likesCount = likesarray.length;
                                // res.json(likesCount);
                                postmodel.update({
                                    place_id: req.body.place_id
                                }, {
                                    $set: {
                                        likes_count: likesCount
                                    }
                                }).then(data => {
                                    postmodel.find({
                                        place_id: req.body.place_id
                                    }, {
                                        likes_count: 1,
                                        place_id: 1,
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
                    postmodel.update({ place_id: req.body.place_id }, {
                        $pull: { likes: { $in: [req.body.email] } },
                    }).then(data => {
                        postmodel.find({ place_id: req.body.place_id }, { _id: 0, likes: 1 }).then(data => {
                            var likesArray = data[0].likes;
                            var likescount = likesArray.length;
                            postmodel.update({
                                place_id: req.body.place_id
                            }, {
                                $set: {
                                    likes_count: likescount
                                }
                            }).then(data => {
                                // res.json(data);
                                if (Object.keys(data).length == 0) {
                                    res.json(data);
                                } else {
                                    postmodel.find({ place_id: req.body.place_id }, { _id: 0, place_id: 1, likes_count: 1 }).then(data => {
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