
const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please enter a name for the item"]
    },
    price: {
        type: Number,
        unique: true,
        required: [true, "Please enter a price for the item"],
        min: [0, "Price should be more than 0"]

    },
    img: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    soldQuantity: {
        type: Number,
        default: 1
    },
    fakeQuantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Item", ItemSchema);
