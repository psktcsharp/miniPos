const express = require("express")
const { getCashiers,
    createCashier } = require("../controllers/cashiers")

const router = express.Router();
router
    .route("/")
    .get(getCashiers).post(createCashier)

module.exports = router;