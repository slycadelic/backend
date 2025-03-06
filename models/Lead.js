const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Leads = mongoose.model("Lead", Schema)

module.exports = Leads;