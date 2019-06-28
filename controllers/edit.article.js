const postmodel = require('../models/post.model');
const placemodel = require('../models/places.model');
const alienmodel = require('../models/alien.model');
const moviesmodel = require('../models/movies.model');

const config = require('../configs/configs');

const jwt = require('jsonwebtoken');
const random = require('randomstring');


exports.editArticle = (req, res) => {
    if (Object.keys(req.body) <= 0) {
        sendFailedresponse(req, res, "request body is empty")
    } else if (req.body.email == "" || !req.body.email) {
        sendFailedresponse(req, res, "Email is empty");
    } else if (req.body.token == "" || !req.body.token) {
        sendFailedresponse(req, res, "Token is empty");
    } else if (req.body.user_id == "" || !req.body.user_id) {
        sendFailedresponse(req, res, "user id is empty");
    } else if (req.body.a_role == "" || !req.body.a_role) {
        sendFailedresponse(req, res, "role is empty");
    } else if (req.body.type == "" || !req.body.type) {
        sendFailedresponse(req, res, "type is empty");
    } else if (req.body.id == "" || !req.body.id) {
        sendFailedresponse(req, res, "id is empty");
    } else if (req.body.data == "" || !req.body.data) {
        sendFailedresponse(req, res, "data is empty");
    }

    jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
        if (err) {
            sendFailedResponse(req, res, err.message)
        }

        if (decoded.user_id == req.body.user_id) {
            updateTheRecord(req, res);
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

function sendSuccessResponse(req, res, data) {
    return res.status(200).send({
        data: data,
        status: 'success'
    })
}

function updateTheRecord(req, res) {
    if (req.body.type == "post") {
        postmodel.updateOne({ post_id: req.body.id }, { $set: { description: req.body.data } }).then(data => {
            sendSuccessResponse(req, res, data);
        }).catch(err => {
            sendFailedresponse(req, res, err.message);
        })
    } else if (req.body.type == "place") {
        placemodel.updateOne({ place_id: req.body.id }, { $set: { description: req.body.data } }).then(data => {
            sendSuccessResponse(req, res, data);
        }).catch(err => {
            sendFailedresponse(req, res, err.message);
        })
    } else if (req.body.type == "alien") {
        alienmodel.updateOne({ alienPost_id: req.body.id }, { $set: { description: req.body.data } }).then(data => {
            sendSuccessResponse(req, res, data);
        }).catch(err => {
            sendFailedresponse(req, res, err.message);
        })
    } else if (req.body.type == "movie") {
        moviesmodel.updateOne({ movie_id: req.body.id }, { $set: { description: req.body.data } }).then(data => {
            sendSuccessResponse(req, res, data);
        }).catch(err => {
            sendFailedresponse(req, res, err.message);
        })
    }
}