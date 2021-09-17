const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true
    },

    num: {
        type: Number,
        required: true
    }
})

const Setting = new mongoose.model('Setting', settingSchema);
module.exports = Setting;