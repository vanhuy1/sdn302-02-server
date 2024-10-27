const mongoose = require('mongoose');

const serviceItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ServiceItem', serviceItemSchema);
