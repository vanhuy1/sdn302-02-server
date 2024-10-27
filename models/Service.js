const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    serviceItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceItem'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
