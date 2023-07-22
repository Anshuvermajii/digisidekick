const mongoose = require('mongoose');

const schmaData = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },
    mobile: {

        type: String,
        required: true


    },
    email: {

        type: String,
        required: true
    },
    password: {

        type: String,
        required: true
    }




}, {
    timestamps: true

})

const userModel = mongoose.model("user", schmaData)
module.exports = userModel;