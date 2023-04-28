const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: [],
        required: true
    },
    delivery: {
        type: Boolean,
        default: false,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: String,
        default: "pending",
        required: true
    },
},
{ timestamps: true }
);


module.exports = mongoose.model("products", productSchema)