const postmodel = require('../models/post.model');
const placemodel = require('../models/places.model');
const alienmodel = require('../models/alien.model');
const moviesmodel = require('../models/movies.model');



exports.get_data = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'Request is empty',
            status: 'Failed',
        })
    } else if (req.body.type == "" || !req.body.type) {
        return res.status(200).send({
            message: 'Type is empty',
            status: 'Failed'
        })
    } else if (req.body.id == "" || !req.body.id) {
        return res.status(200).send({
            message: 'Id is empty',
            status: 'Failed'
        })
    }


    if (req.body.type == "posts") {
        postmodel.findOne({ post_id: req.body.id }, { _id: 0, __v: 0, likes: 0, dis_likes: 0, post_by: 0 })
            .then(data => {
                res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                res.status(200).send({
                    message: 'Sorry unable to find post',
                    status: 'Failed'
                })
            })
    } else if (req.body.type == "places") {
        placemodel.findOne({ place_id: req.body.id }, { _id: 0, __v: 0, likes: 0, dis_likes: 0, post_by: 0 })
            .then(data => {
                res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                res.status(200).send({
                    message: 'Sorry unable to find place',
                    status: 'Failed'
                })
            })

    } else if (req.body.type == "aliens") {
        alienmodel.findOne({ alienPost_id: req.body.id }, { _id: 0, __v: 0, likes: 0, dis_likes: 0, post_by: 0 })
            .then(data => {
                res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                res.status(200).send({
                    message: 'Sorry unable to find post',
                    status: 'Failed'
                })
            })

    } else if (req.body.type == "movies") {
        moviesmodel.findOne({ movie_id: req.body.id }, { _id: 0, __v: 0, likes: 0, dis_likes: 0, post_by: 0 })
            .then(data => {
                res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                res.status(200).send({
                    message: 'Sorry unable to find post',
                    status: 'Failed'
                })
            })
    }


}