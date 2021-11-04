const mongoose = require("mongoose");

const ProducstSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productTotal: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Products = mongoose.model("product", ProducstSchema);