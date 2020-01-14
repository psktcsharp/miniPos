const express = require("express")
const { getItems,
    createItem } = require("../controllers/items")

const router = express.Router();
router
    .route("/")
    .get(getItems)
router
    .route("/")
    .post(createItem)
module.exports = router;