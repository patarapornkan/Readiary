const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    records: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Record'
        }
    ],
    setting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Setting'
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);