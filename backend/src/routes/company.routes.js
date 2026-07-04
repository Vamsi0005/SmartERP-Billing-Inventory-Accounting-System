const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createCompany,getCompanies
} = require("../controllers/company.controller");

// Protected Route
router.post("/", authenticate, createCompany);
router.get("/", authenticate, getCompanies);

module.exports = router;