const express = require("express")
const { getCashiers } = require("../controllers/cashiers")

const router = express.Router();
router
    .route("/")
    .get(getCashiers)

module.exports = router;