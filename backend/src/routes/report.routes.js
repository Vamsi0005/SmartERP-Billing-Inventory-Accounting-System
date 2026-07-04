const express = require("express");

const {
  getStockReport,
  getPurchaseReport,
  getSalesReport,
} = require("../controllers/report.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stock", authMiddleware, getStockReport);
router.get("/purchase", authMiddleware, getPurchaseReport);
router.get("/sales", authMiddleware, getSalesReport);

module.exports = router;