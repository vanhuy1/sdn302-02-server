const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    staffID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    roomID: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amountBook: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
