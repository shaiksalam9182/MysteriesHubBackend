const regModel = require('../models/register.model');

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
    } else if (req.body.device_type == "" || !req.body.device_type) {
        return res.status(200).send({
            message: 'device type is empty',
            status: 'Failed'
        })
    } else if (req.body.login_by == "" || !req.body.login_by) {
        return res.status(200).send({
            message: 'login_by empty',
            status: 'Failed'
        })
    } else if (req.body.password == "" || !req.body.password) {
        return res.status(200).send({
            message: 'Password is empty'
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
            device_type: req.device_type,
            login_by: req.login_by,
            user_id: userId,
            status: '0'
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