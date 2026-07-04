const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createCustomer,getCustomers,updateCustomer,deleteCustomer,
} = require("../controllers/customer.controller");

router.post("/", authenticate, createCustomer);
router.get("/", authenticate, getCustomers);
router.put("/:id", authenticate, updateCustomer);
router.delete("/:id", authenticate, deleteCustomer);

module.exports = router;