const Bill = require("../models/Bill")

//  @desc get all bills
//  @route GET /api/v1/bills
//  @access Public

exports.getBills = async (req, res, next) => {
    try {
        const bills = await Bill.find({})
        res.status(200).json({
            success: true,
            data: bills
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

//  @desc Get create a bill
//  @route GET /api/v1/bills
//  @access Public

exports.createBill = async (req, res, next) => {
    try {
        const aBill = await Bill.create(req.body);
        console.log(req.body)
        res.status(201).json({
            success: true,
            data: aBill
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
};