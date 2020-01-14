const Item = require("../models/Item")

//  @desc get all items
//  @route GET /api/v1/items
//  @access Public

exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find({})
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

//  @desc Get create an item
//  @route GET /api/v1/item
//  @access Public

exports.createItem = async (req, res, next) => {
    try {
        const anItem = await Item.create(req.body);
        console.log(req.body)
        res.status(201).json({
            success: true,
            data: anItem
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
};