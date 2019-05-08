const updateModel = require('../models/update.model');
const config = require('../configs/configs');




exports.insert_update = (req, res) => {

    const update = new updateModel({
        update_version: req.body.version,
        update_note_one: req.body.one,
        update_note_two: req.body.two,
        update_note_three: req.body.three
    })


    update.save()
        .then(data => {
            return res.status(200).send({
                status: 'success'
            })
        }).catch(err => {
            return res.status(200).send({
                status: 'Failed',
                message: 'Error in inserting update'
            })
        })


}