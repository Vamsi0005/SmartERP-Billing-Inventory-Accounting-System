require("dotenv").config();

const app = require("./app");
const reportRoutes = require("./routes/report.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/api/report", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SmartERP Server running on http://localhost:${PORT}`);
});