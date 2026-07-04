const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
} = require("../controllers/stock.controller");

router.post("/", authenticate, createStock);
router.get("/", authenticate, getStocks);
router.put("/:id", authenticate, updateStock);
router.delete("/:id", authenticate, deleteStock);

module.exports = router;