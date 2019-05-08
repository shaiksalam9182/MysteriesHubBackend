const moviesModel = require('../models/movies.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');



exports.demo_movie_limit = (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
            status: 'Failed'
        })
    }
    // else if (req.body.android_id == "" || !req.body.android_id) {
    //     return res.status(200).send({
    //         message: 'This phone does not support guest user',
    //         status: 'Failed'
    //     })
    // } else if (req.body.token == "" || !req.body.token) {
    //     return res.status(200).send({
    //         message: 'token is empty',
    //         status: 'Failed'
    //     })
    // }

    // var tokenverify = jwt.verify(req.body.token, config.secretkey);


    moviesModel.find({ published: '1' }, {
            _id: 0,
            __v: 0
        }).limit(10)
        .then(data => {
            res.status(200).send({
                status: 'success',
                data: data
            })
        }).catch(err => {
            res.status(200).send({
                message: err.message,
                status: 'Failed'
            })
        })


    // jwt.verify(req.body.token, config.secretkey, function(err, decoded) {
    //     if (err) {
    //         return res.status(200).send({
    //             status: 'Failed',
    //             message: err.name,
    //             code: '500'

    //         })
    //     }



    //     if (decoded.android_id == req.body.android_id) {
    //         // var skip = Number(req.body.skip);
    //         moviesModel.find({ published: '1' }, {
    //                 _id: 0,
    //                 __v: 0
    //             }).limit(10)
    //             .then(data => {
    //                 res.status(200).send({
    //                     status: 'success',
    //                     data: data
    //                 })
    //             }).catch(err => {
    //                 res.status(200).send({
    //                     message: err.message,
    //                     status: 'Failed'
    //                 })
    //             })

    //     } else {
    //         res.status(200).send({
    //             message: 'Inalid Token. Bad request',
    //             status: 'Failed'
    //         })
    //     }

    // })






}