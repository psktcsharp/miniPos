const express = require("express")
const { getCashiers,
    createCashier,
    getCashier } = require("../controllers/cashiers")

const router = express.Router();
router
    .route("/")
    .get(getCashiers).post(createCashier)
router
    .route("/:id")
    .get(getCashier)
module.exports = router;