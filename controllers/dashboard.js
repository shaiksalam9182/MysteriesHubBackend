const userModel = require('../models/register.model');
const postModel = require('../models/post.model');
const placeModel = require('../models/places.model');
const alienModel = require('../models/alien.model');
const movieModel = require('../models/movies.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');

exports.dashboard = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        sendFailedResponse(req, res, "Request body is empty")
    } else if (req.body.user_id == "" || !req.body.user_id) {
        sendFailedResponse(req, res, "User id is empty");
    } else if (req.body.token == "" || !req.body.token) {
        sendFailedResponse(req, res, "Token is empty")
    }

    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            sendFailedResponse(req, res, err.message);
        }

        if (decoded.user_id == req.body.user_id) {
            var users, posts, places, aliens, movies;


            userModel.find().count().then(data => {
                users = data;
                postModel.find({ published: "1" }).count().then(data => {
                    posts = data;
                    placeModel.find({ published: "1" }).count().then(data => {
                        places = data;
                        alienModel.find({ published: "1" }).count().then(data => {
                            aliens = data;
                            movieModel.find({ published: "1" }).count().then(data => {
                                movies = data;
                                return res.status(200).send({
                                    status: 'success',
                                    data: {
                                        uc: users,
                                        pc: posts,
                                        plc: places,
                                        ac: aliens,
                                        mc: movies
                                    }
                                })
                                console.log(movies, "m");
                            }).catch(err => {
                                sendFailedResponse(req, res, err.message);
                            })
                            console.log(aliens, "a");
                        }).catch(err => {
                            sendFailedResponse(req, res, err.message);
                        })
                        console.log(places, "pl");
                    }).catch(err => {
                        sendFailedResponse(req, res, err.message);
                    })
                    console.log(posts, "p");
                }).catch(err => {
                    sendFailedResponse(req, res, err.message);
                })
            }).catch(err => {
                sendFailedResponse(req, res, err.message);
            })



            console.log("totalDat", users, posts, places, aliens, movies);




        } else {
            sendFailedResponse(req, res, "Invalid token");
        }



    })

}

function sendFailedResponse(req, res, message) {
    return res.status(200).send({
        message: message,
        status: 'Failed'
    })
}