const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    bookingID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking'
    },
    customerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roomDetails: [
        {
            roomCategory: {
                type: String,
                required: true
            },
            roomNumber: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    services: [
        {
            serviceName: {
                type: String,
                required: true
            },
            servicePrice: {
                type: Number,
                required: true
            }
        }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    arriveDate: {
        type: Date,
        required: true
    },
    leaveDate: {
        type: Date,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
