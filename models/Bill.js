
const mongoose = require("mongoose");
const BillSchema = new mongoose.Schema({
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cashier"
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
        }]
    },
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bill", BillSchema);
