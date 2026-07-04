const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");

router.post("/", authenticate, createSupplier);
router.get("/", authenticate, getSuppliers);
router.put("/:id", authenticate, updateSupplier);
router.delete("/:id", authenticate, deleteSupplier);

module.exports = router;