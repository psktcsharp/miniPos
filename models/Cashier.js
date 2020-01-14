const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const CashierSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"]
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please choose a valid email ex: someone@email.com"
        ]
    },
    password: {
        type: String,
        required: [true, "Please choose a password"],
        minlength: 4,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypting password with bcrypt before each save
CashierSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign jwt and return
CashierSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};

//Match user entered password to hashed pass in db
CashierSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

module.exports = mongoose.model("Cashier", CashierSchema);
