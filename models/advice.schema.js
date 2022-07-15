const mongoose = require("mongoose");

const AdviceSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const Advice = mongoose.model("advices", AdviceSchema);

module.exports = Advice;
