const mongoose = require('mongoose');

const roomCategorySchema = new mongoose.Schema({
    roomCategoryName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('RoomCategory', roomCategorySchema);
