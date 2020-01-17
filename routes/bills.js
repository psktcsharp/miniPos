const express = require("express")
const { getBills,
    createBill } = require("../controllers/bills")

const router = express.Router();
router
    .route("/")
    .get(getBills)
router
    .route("/")
    .post(createBill)
module.exports = router;