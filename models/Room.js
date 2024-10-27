const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    categoryRoomID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'RoomCategory'
    },
    roomNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['E', 'R', 'B'] // E: empty, R: reserved, B: busy
    },
    description: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
