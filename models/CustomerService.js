const mongoose = require('mongoose');

const customerServiceSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    servicePrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CustomerService', customerServiceSchema);
