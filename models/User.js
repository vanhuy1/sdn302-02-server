const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    address: {
        type: String,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    identifyNumber: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ["Customer"]
    },
    active: {
        type: Boolean,
        default: true
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceItem'
    }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
