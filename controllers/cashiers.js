const Cashier = require("../models/Cashier")

//  @desc Test get route
//  @route GET /api/v1/cashiers
//  @access Public

exports.getCashiers = async (req, res, next) => {
    console.log("starting get")
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