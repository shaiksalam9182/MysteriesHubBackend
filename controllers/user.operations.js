const userModel = require('../models/register.model');
const config = require('../configs/configs');

const jwt = require('jsonwebtoken');


exports.user_opertations = (req, res) => {
    if (Object.keys(req).length == 0) {
        return res.status(200).send({
            status: 'Failed',
            message: 'Request body is emtpy'
        })
    } else if (req.body.user_id == "" || !req.body.user_id) {
        return res.status(200).send({
            status: 'Failed',
            message: 'User id is empty'
        })
    } else if (req.body.token == "" || !req.body.token) {
        return res.status(200).send({
            status: 'Failed',
            message: 'Token is empty'
        })
    } else if (req.body.opertaion == "" || !req.body.opertaion) {
        return res.status(200).send({
            status: 'Failed',
            message: 'Oprations is emtpy'
        })
    } else if (req.body.opertaion_value == "" || !req.body.opertaion_value) {
        return res.status(200).send({
            status: 'Failed',
            message: 'operation value is empty'
        })
    } else if (req.body.vuid == "" || !req.body.vuid) {
        return res.status(200).send({
            status: 'Failed',
            message: 'victim id is empty'
        })
    }

    if (req.body.opertaion_value == "bu") {
        blockUser(req, res);
    } else if (req.body.opertaion_value == "du") {
        deleteUser(req, res);
    }

}

function blockUser(req, res) {
    userModel.find({ user_id: req.body.vuid }).then(data => {
        if (Object.keys(data).length > 0) {
            userModel.updateOne({ user_id: req.body.vuid }, {
                $set: { status: '1' }
            }).then(data => {
                return res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                return res.status(200).send({
                    message: err.message,
                    status: 'Failed'
                })
            })
        } else {
            return res.status(200).send({
                message: 'No user found',
                status: 'Failed'
            })
        }
    }).catch(err => {
        return res.status(200).send({
            message: err.message,
            status: 'Failed'
        })
    })
}

function deleteUser(req, res) {
    userModel.find({ user_id: req.body.vuid }).then(data => {
        if (Object.keys(data).length > 0) {
            userModel.remove({ user_id: req.body.vuid }).then(data => {
                return res.status(200).send({
                    status: 'success',
                    data: data
                })
            }).catch(err => {
                return res.status(200).send({
                    message: err.message,
                    status: 'Failed'
                })
            })
        } else {
            return res.status(200).send({
                message: 'No user found',
                status: 'Failed'
            })
        }
    }).catch(err => {
        return res.status(200).send({
            message: err.message,
            status: 'Failed'
        })
    })
}