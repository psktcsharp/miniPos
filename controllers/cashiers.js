const Cashier = require("../models/Cashier")

//  @desc get all cashiers
//  @route GET /api/v1/cashiers
//  @access Public

exports.getCashiers = async (req, res, next) => {
    try {
        const cashiers = await Cashier.find({})
        res.status(200).json({
            success: true,
            data: cashiers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

// //  @desc create a cashier
// //  @route GET /api/v1/cashiers
// //  @access Public

// exports.createCashier = async (req, res, next) => {
//     try {
//         console.log(req.body)
//         const cashier = await Cashier.create(req.body);
//         console.log("getting cashier")
//         res.status(201).json({
//             success: true,
//             data: cashier
//         })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: error.message
//         })
//     }
// }

//  @desc Get a single cashier
//  @route GET /api/v1/cashiers/:id
//  @access Public

exports.getCashier = async (req, res, next) => {
    try {
        const aCashier = await Cashier.findById(req.params.id)
        if (!aCashier) {
            return res.status(400).success({
                success: false
            })
        }
        res.status(200).json({
            success: true,
            data: aCashier
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })

    }
}

