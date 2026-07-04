const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/company.routes");
const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const supplierRoutes = require("./routes/supplier.routes");
const stockRoutes = require("./routes/stock.routes");
const purchaseRoutes = require("./routes/purchase.routes");
const saleRoutes = require("./routes/sale.routes");



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SmartERP API 🚀",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Company
app.use("/api/company", companyRoutes);

app.use("/api/customer", customerRoutes);

app.use("/api/supplier", supplierRoutes);

app.use("/api/stock", stockRoutes);

app.use("/api/purchase", purchaseRoutes);

app.use("/api/sale", saleRoutes);

module.exports = app;