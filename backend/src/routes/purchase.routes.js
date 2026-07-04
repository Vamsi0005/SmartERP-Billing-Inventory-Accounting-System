const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createPurchase,
  getPurchases,
} = require("../controllers/purchase.controller");

router.post("/", authenticate, createPurchase);

router.get("/", authenticate, getPurchases);

module.exports = router;