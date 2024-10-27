const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    {
        departmentID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },
        staffName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        image: {
            type: String,
            default: null,
        },
        birthday: {
            type: Date,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        identityNumber: {
            type: Number,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
