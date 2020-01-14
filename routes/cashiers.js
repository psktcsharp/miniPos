const express = require("express")
const { getCashiers,
    getCashier } = require("../controllers/cashiers")

const router = express.Router();
router
    .route("/")
    .get(getCashiers)
router
    .route("/:id")
    .get(getCashier)
module.exports = router;