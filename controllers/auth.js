const Cashier = require('../models/Cashier')

//  @desc Cashier sign up
//  @route POST /api/v1/auth/signup
//  @access Public
exports.signup = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        //Create cashier in db
        const cashier = await Cashier.create({
            fullName,
            email,
            password
        })
        //create a token send the cookie
        aToeknResponse(cashier, 200, res)
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }

}
//  @desc Cashier login
//  @route POST /api/v1/auth/login
//  @access Public
exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        //check email and passsword
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "please enter your email and password"
            })
        }
        //check cashier
        const cashier = await (await Cashier.findOne({ email }).select('+password'));
        if (!cashier) {
            return res.status(401).json({
                success: false,
                msg: "Invalid login credentials"
            })
        }

        //password check
        const isMatch = await cashier.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "wrong password"
            })
        }
        //create token send cookie
        aToeknResponse(cashier, 200, res)
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}
//  @desc Get the current logged in cashier
//  @route POST /api/v1/auth/loggedin
//  @access Private

exports.getCurrentCashier = async (req, res, next) => {
    try {
        const cashier = await Cashier.findById(req.cashier.id);
        res.status(200).json({
            success: true,
            data: cashier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

//create a cookie using a token from model, send it in a response
const aToeknResponse = (cashier, statuscode, res) => {
    const aToken = cashier.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statuscode)
        .cookie('token', aToken, options)
        .json({
            success: true, aToken
        })
}