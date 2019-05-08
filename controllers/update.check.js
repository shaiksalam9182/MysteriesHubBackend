const updateModel = require('../models/update.model');
const config = require('../configs/configs');




exports.read_update = (req, res) => {

    updateModel.find({}, {
            _id: 0,
            __v: 0
        }).sort({ _id: -1 }).limit(1)
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


}