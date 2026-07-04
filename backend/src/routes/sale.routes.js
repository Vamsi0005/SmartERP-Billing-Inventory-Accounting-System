const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createSale,
  getSales,
} = require("../controllers/sale.controller");

router.post("/", authenticate, createSale);

router.get("/", authenticate, getSales);

module.exports = router;