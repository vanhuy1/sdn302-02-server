const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
    serviceCategoryName: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema);
