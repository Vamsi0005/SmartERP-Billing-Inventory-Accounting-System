import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import CompanySelection from "../pages/Company/CompanySelection";
import CreateCompany from "../pages/Company/CreateCompany";
import Dashboard from "../pages/Dashboard/Dashboard";
import CustomerList from "../pages/Customer/CustomerList";
import CustomerForm from "../pages/Customer/CustomerForm";
import SupplierList from "../pages/Supplier/SupplierList";
import SupplierForm from "../pages/Supplier/SupplierForm";
import StockList from "../pages/Stock/StockList";
import StockForm from "../pages/Stock/StockForm";
import PurchaseList from "../pages/Purchase/PurchaseList";
import PurchaseForm from "../pages/Purchase/PurchaseForm";
import SaleList from "../pages/Sale/SaleList";
import SaleForm from "../pages/Sale/SaleForm";
import ReportPage from "../pages/Report/ReportPage";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company" element={<CompanySelection />} />
        <Route path="/company/create" element={<CreateCompany />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />

        <Route path="/customers/create" element={<CustomerForm />} />
        <Route path="/customers/edit/:id" element={<CustomerForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/suppliers/create" element={<SupplierForm />} />
        <Route path="/suppliers/edit/:id" element={<SupplierForm />} />
        <Route path="/stock" element={<StockList />} />
        <Route path="/stock/create" element={<StockForm />} />
        <Route path="/stock/edit/:id" element={<StockForm />} />
        <Route path="/purchase" element={<PurchaseList />} />
        <Route path="/purchase/create" element={<PurchaseForm />} />
        <Route path="/sales" element={<SaleList />} />
        <Route path="/sales/create" element={<SaleForm />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;