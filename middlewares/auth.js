const jwt = require('jsonwebtoken');
const Cashier = require('../models/Cashier');

// Protect routes
exports.protect = async (req, res, next) => {

    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        // confrim a token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Not Authorized to access this route"
            });
        }

        try {
            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decoded);
            req.cashier = await Cashier.findById(decoded.id);
            next();

        } catch (e) {
            return res.status(401).json({
                success: false,
                msg: "Not Authorized to access this route"
            });
        }

    } catch (e) {
        return res.status(401).json({
            success: false,
            msg: "Token Error, Not Authorized to access this route"
        });
    }

};


