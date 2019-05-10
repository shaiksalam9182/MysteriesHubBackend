const postModel = require('../models/post.model');
const placeModel = require('../models/places.model');
const alienModel = require('../models/alien.model');
const movieModel = require('../models/movies.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');


exports.approval = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        sendFailedresponse(req, res, "Request body is empty");
    } else if (req.body.user_id == "" || !req.body.user_id) {
        sendFailedresponse(req, res, "User id is empty");
    } else if (req.body.token == "" || !req.body.token) {
        sendFailedresponse(req, res, "Token is empty");
    } else if (req.body.type == "" || !req.body.type) {
        sendFailedresponse(req, res, "Type is empty");
    }

    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            sendFailedresponse(req, res, err.message)
        }

        if (decoded.user_id == req.body.user_id) {
            if (req.body.type == "posts") {
                postModel.find({ published: '0' }, { _id: 0, __v: 0 }).then(data => {
                    return res.status(200).send({
                        status: 'success',
                        data: data
                    })
                }).catch(err => {
                    sendFailedresponse(req, res, err.message);
                })
            } else if (req.body.type == "places") {
                placeModel.find({ published: '0' }, { _id: 0, __v: 0 }).then(data => {
                    return res.status(200).send({
                        status: 'success',
                        data: data
                    })
                }).catch(err => {
                    sendFailedresponse(req, res, err.message);
                })
            } else if (req.body.type == "aliens") {
                alienModel.find({ published: '0' }, { _id: 0, __v: 0 }).then(data => {
                    return res.status(200).send({
                        status: 'success',
                        data: data
                    })
                }).catch(err => {
                    sendFailedresponse(req, res, err.message);
                })
            } else if (req.body.type == "movies") {
                movieModel.find({ published: '0' }, { _id: 0, __v: 0 }).then(data => {
                    return res.status(200).send({
                        status: 'success',
                        data: data
                    })
                }).catch(err => {
                    sendFailedresponse(req, res, err.message);
                })
            } else if (req.body.type == "edit_post") {
                if (req.body.post_id == "" || !req.body.post_id) {
                    sendFailedresponse(req, res, "post id is empty");
                } else {
                    postModel.updateOne({ post_id: req.body.post_id }, { $set: { published: "1" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }
            } else if (req.body.type == "edit_place") {
                if (req.body.place_id == "" || !req.body.place_id) {
                    sendFailedresponse(req, res, "Place id is empty");
                } else {
                    placeModel.updateOne({ place_id: req.body.place_id }, { $set: { published: "1" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }
            } else if (req.body.type == "edit_alien") {
                if (req.body.alienPost_id == "" || !req.body.alienPost_id) {
                    sendFailedresponse(req, res, "Alien id is empty");
                } else {
                    alienModel.updateOne({ alienPost_id: req.body.alienPost_id }, { $set: { published: "1" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }
            } else if (req.body.type == "edit_movie") {
                if (req.body.movie_id == "" || !req.body.movie_id) {
                    sendFailedresponse(req, res, "Movie id is empty");
                } else {
                    movieModel.updateOne({ movie_id: req.body.movie_id }, { $set: { published: "1" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }
            } else if (req.body.type == "rm_post") {
                if (req.body.post_id == "" || !req.body.post_id) {
                    sendFailedresponse(req, res, "Post id is empty");
                } else {
                    postModel.updateOne({ post_id: req.body.post_id }, { $set: { published: "2" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }
            } else if (req.body.type == "rm_place") {
                if (req.body.place_id == "" || !req.body.place_id) {
                    sendFailedresponse(req, res, "Place id is empty");
                } else {
                    placeModel.updateOne({ place_id: req.body.place_id }, { $set: { published: "2" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }

            } else if (req.body.type == "rm_alien") {
                if (req.body.alienPost_id == "" || !req.body.alienPost_id) {
                    sendFailedresponse(req, res, "Alien post id is empty");
                } else {
                    alienModel.updateOne({ alienPost_id: req.body.alienPost_id }, { $set: { published: "2" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }

            } else if (req.body.type == "rm_movie") {
                if (req.body.movie_id == "" || !req.body.movie_id) {
                    sendFailedresponse(req, res, "Post id is empty");
                } else {
                    movieModel.updateOne({ movie_id: req.body.movie_id }, { $set: { published: "2" } }).then(data => {
                        return res.status(200).send({
                            status: 'success',
                            data: data
                        })
                    }).catch(err => {
                        sendFailedresponse(req, res, err.message);
                    })
                }
            } else {
                sendFailedresponse(req, res, "Invalid type");
            }
        } else {
            sendFailedresponse(req, res, "Invalid token");
        }


    })

}


function sendFailedresponse(req, res, message) {
    return res.status(200).send({
        message: message,
        status: 'Failed'
    })
}