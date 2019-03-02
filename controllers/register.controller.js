const regModel = require('../models/register.model');

const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    console.log('requestBody', req.body,"request body");
    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({
            message: 'request body is empty'
        })
    } else if (req.body.fullname == "" || !req.body.fullname) {
        return res.status(400).send({
            message: 'Fullname is empty'
        })
    } else if (req.body.device_type == "" || !req.body.device_type) {
        return res.status(400).send({
            message: 'device type is empty'
        })
    } else if (req.body.login_by == "" || !req.body.login_by) {
        return res.status(400).send({
            message: 'login_by empty'
        })
    } else if (req.body.verified == "" || !req.body.verified) {
        return res.status(400).send({
            message: 'verification is empty'
        })
    }

    if (req.body.login_by == "manual") {
        if (req.body.password == "" || !req.body.password) {
            return res.status(200).send({
                message: 'Password is empty'
            })
        }
    }

    if (req.body.phone == "" || !req.body.phone) {


        regModel.find({
                email: req.body.email
            })
            .then(data => {
                if (Object.keys(data).length == 0) {
                    register(req.body, res);
                } else {
                    var verified = data[0].verified;
                    if (verified == "Yes") {
                        res.status(200).send({
                            message: 'User already registered',
                            code: '301'
                        })
                    } else {
                        res.status(200).send({
                            message: 'Not verified',
                            code: '300',
                            email: data[0].email
                        })

                    }
                }
            }).catch(err => {
                res.status(200).send({
                    message: 'Error while registering.'
                })
            })



    } else {

        regModel.find({
                phone: req.body.phone
            })
            .then(data => {
                if (Object.keys(data).length == 0) {
                    register(req.body, res);
                } else {
                    var verified = data[0].verified;
                    if (verified == "Yes") {
                        res.status(200).send({
                            message: 'User already registered',
                            code: '301'
                        })
                    } else {
                        res.status(200).send({
                            message: 'Not verified',
                            code: '300',
                            phone: data[0].phone
                        })

                    }
                }
            }).catch(err => {
                res.status(200).send({
                    message: 'Error while registering.'
                })
            })
    }

}

function register(req, res) {

    const saltRounds = 10;
    var encryptedPassword = "";

    bcrypt.hash(req.password, saltRounds, function(err, hash) {
        encryptedPassword = hash;
        const reg = new regModel({
            fullname: req.fullname,
            phone: req.phone,
            email: req.email,
            password: encryptedPassword,
            device_type: req.device_type,
            login_by: req.login_by,
            verified: req.verified
        })


        reg.save()
            .then(data => {
                var resData = data.toObject();
                delete resData.password;
                resData.status = "success";
                res.json(resData);
            }).catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    })



}
