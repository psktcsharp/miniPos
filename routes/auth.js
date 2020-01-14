const express = require("express");
const {
    signup,
    login,
    getCurrentCashier
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require('../middlewares/auth')

router.post('/signup', signup);
router.post('/login', login);
router.get('/loggedin', protect, getCurrentCashier)

module.exports = router;
