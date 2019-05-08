exports.suggestion_verify = (req, res) => {
    const postmodel = require('../models/post.model');
    const placemodel = require('../models/places.model');
    const alienmodel = require('../models/alien.model');
    const moviemodel = require('../models/movies.model');
    const jwt = require('jsonwebtoken');
    const config = require('../configs/configs');


    if (Object.keys(req).length == 0) {
        return res.status(200).send({
            message: 'Request body is empty',
            status: 'Failed'
        })
    } else if (req.body.email == "" || !req.body.email) {
        return res.status(200).send({
            message: 'E-mail is empty',
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
    } else if (req.body.type == "" || !req.body.type) {
        return res.status(200).send({
            message: 'Type is missing',
            status: 'Failed'
        })
    }

    console.log('checksPassed');

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

            if (req.body.type == "posts") {
                postmodel.find({
                    $and: [
                        { post_id: req.body.post_id },
                        { likes: { $in: [req.body.email] } }
                    ]
                }).then(likedata => {
                    if (Object.keys(likedata).length > 0) {
                        res.status(200).send({
                            status: 'success',
                            action: 'liked'
                        })
                    } else {
                        postmodel.find({
                            $and: [
                                { post_id: req.body.post_id },
                                { dis_likes: { $in: [req.body.email] } }
                            ]
                        }).then(data => {
                            if (Object.keys(data).length > 0) {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'disliked'
                                })
                            } else {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'nothing'
                                })
                            }

                        }).catch(err => {
                            console.log(err);
                            res.status(200).send({
                                message: 'Error in searching',
                                status: 'Failed'
                            })
                        })
                    }

                }).catch(err => {
                    console.log(err);
                    res.status(200).send({
                        message: 'Error in searching',
                        status: 'Failed'
                    })
                })
            } else if (req.body.type == "places") {
                placemodel.find({
                    $and: [
                        { post_id: req.body.post_id },
                        { likes: { $in: [req.body.email] } }
                    ]
                }).then(likedata => {
                    if (Object.keys(likedata).length > 0) {
                        res.status(200).send({
                            status: 'success',
                            action: 'liked'
                        })
                    } else {
                        placemodel.find({
                            $and: [
                                { post_id: req.body.post_id },
                                { dis_likes: { $in: [req.body.email] } }
                            ]
                        }).then(data => {
                            if (Object.keys(data).length > 0) {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'disliked'
                                })
                            } else {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'nothing'
                                })
                            }

                        }).catch(err => {
                            console.log(err);
                            res.status(200).send({
                                message: 'Error in searching',
                                status: 'Failed'
                            })
                        })
                    }

                }).catch(err => {
                    console.log(err);
                    res.status(200).send({
                        message: 'Error in searching',
                        status: 'Failed'
                    })
                })

            } else if (req.body.type == "aliens") {
                alienmodel.find({
                    $and: [
                        { post_id: req.body.post_id },
                        { likes: { $in: [req.body.email] } }
                    ]
                }).then(likedata => {
                    if (Object.keys(likedata).length > 0) {
                        res.status(200).send({
                            status: 'success',
                            action: 'liked'
                        })
                    } else {
                        alienmodel.find({
                            $and: [
                                { post_id: req.body.post_id },
                                { dis_likes: { $in: [req.body.email] } }
                            ]
                        }).then(data => {
                            if (Object.keys(data).length > 0) {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'disliked'
                                })
                            } else {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'nothing'
                                })
                            }

                        }).catch(err => {
                            console.log(err);
                            res.status(200).send({
                                message: 'Error in searching',
                                status: 'Failed'
                            })
                        })
                    }

                }).catch(err => {
                    console.log(err);
                    res.status(200).send({
                        message: 'Error in searching',
                        status: 'Failed'
                    })
                })

            } else if (req.body.type == "movies") {
                moviemodel.find({
                    $and: [
                        { post_id: req.body.post_id },
                        { likes: { $in: [req.body.email] } }
                    ]
                }).then(likedata => {
                    if (Object.keys(likedata).length > 0) {
                        res.status(200).send({
                            status: 'success',
                            action: 'liked'
                        })
                    } else {
                        moviemodel.find({
                            $and: [
                                { post_id: req.body.post_id },
                                { dis_likes: { $in: [req.body.email] } }
                            ]
                        }).then(data => {
                            if (Object.keys(data).length > 0) {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'disliked'
                                })
                            } else {
                                res.status(200).send({
                                    status: 'success',
                                    action: 'nothing'
                                })
                            }

                        }).catch(err => {
                            console.log(err);
                            res.status(200).send({
                                message: 'Error in searching',
                                status: 'Failed'
                            })
                        })
                    }

                }).catch(err => {
                    console.log(err);
                    res.status(200).send({
                        message: 'Error in searching',
                        status: 'Failed'
                    })
                })
            }
        } else {
            res.status(200).send({
                message: 'Invalid token. Bad Request',
                status: 'Failed'
            })
        }

    })



}