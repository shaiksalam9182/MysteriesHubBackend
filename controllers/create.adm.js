const regModel = require('../models/admin.model');

const bcrypt = require('bcrypt');
const randomString = require('randomstring');

exports.register = (req, res) => {
    console.log('requestBody', req.body, "request body");
    if (Object.keys(req.body).length == 0) {
        return res.status(200).send({
            message: 'request body is empty',
            status: 'Failed'
        })
    } else if (req.body.fullname == "" || !req.body.fullname) {
        return res.status(200).send({
            message: 'Fullname is empty',
            status: 'Failed'
        })
    } else if (req.body.password == "" || !req.body.password) {
        return res.status(200).send({
            message: 'Password is empty',
            status: 'Failed'
        })

    } else if (req.body.sadmin_role == "" || !req.body.sadmin_role) {
        return res.status(200).send({
            message: 'role is empty',
            status: 'Failed'
        })
    } else if (req.body.vadmin_role == "" || !req.body.vadmin_role) {
        return res.status(200).send({
            message: 'vadmin role is empty',
            status: 'Failed',
        })
    } else if (req.body.sadmin_role != 'rootSalam') {
        return res.status(200).send({
            message: 'You are not allowed to create admin',
            status: 'Failed'
        })
    }
    regModel.find({
            email: req.body.email
        })
        .then(data => {
            if (Object.keys(data).length == 0) {
                register(req.body, res);
            } else {

                res.status(200).send({
                    message: 'User already registered',
                    status: 'Failed'
                })

            }
        }).catch(err => {
            res.status(200).send({
                message: 'Error while registering.'
            })
        })
}



function register(req, res) {

    const saltRounds = 10;
    var encryptedPassword = "";
    var userId = randomString.generate(7);

    bcrypt.hash(req.password, saltRounds, function(err, hash) {
        encryptedPassword = hash;
        const reg = new regModel({
            fullname: req.fullname,
            email: req.email,
            password: encryptedPassword,
            admin_role: req.vadmin_role,
            user_id: userId,
        })


        reg.save()
            .then(data => {
                var resData = data.toObject();
                delete resData.password;
                resData.status = "success";
                res.json(resData);
            }).catch(err => {
                res.status(200).send({
                    message: 'Error occured',
                    status: 'Failed',
                })
            })
    })



}