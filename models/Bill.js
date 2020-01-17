
const mongoose = require("mongoose");
const BillSchema = new mongoose.Schema({
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cashier",
        required: true
    },
    soldItems: {
        type: [{
            name: String,
            price: Number,
            img: String,
            available: Boolean,
            createdAt: Date,
            soldQuantity: Number,
            fakeQuantity: Number
        }],
        required: true
    },
    total: {
        type: Number,
        required: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bill", BillSchema);
