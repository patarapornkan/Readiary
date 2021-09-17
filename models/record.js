const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['fiction', 'non-fiction']
    }, 
    bookName: {
        type: String, 
        required: true
    }, 
    memo: {
        type: String,
        required: true
    }
})

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;