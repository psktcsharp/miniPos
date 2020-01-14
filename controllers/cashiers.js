const Cashier = require("../models/Cashier")

//  @desc Test get route
//  @route GET /api/v1/cashiers
//  @access Public

exports.getCashiers = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: "Your get works just fine"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

//  @desc create a cashier
//  @route GET /api/v1/cashiers
//  @access Public

exports.createCashier = async (req, res, next) => {
    try {
        console.log(req.body)
        const cashier = await Cashier.create(req.body);
        console.log("getting cashier")
        res.status(201).json({
            success: true,
            data: cashier
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}