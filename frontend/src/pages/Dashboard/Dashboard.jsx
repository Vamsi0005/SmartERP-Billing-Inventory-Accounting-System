import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../../components/layout/MainLayout";
import api from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    totalSuppliers: 0,
    totalStockItems: 0,
    totalPurchaseAmount: 0,
    totalSalesAmount: 0,
    estimatedProfit: 0,
    lowStockItems: [],
    recentPurchases: [],
    recentSales: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/dashboard?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data.data);

    } catch (error) {

      toast.error("Failed to load dashboard");

    }
  };
  return (

    
  <MainLayout>
    <div className="mt-10 bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold text-red-600 mb-5">
    ⚠ Low Stock Items
  </h2>

  {dashboard.lowStockItems.length === 0 ? (

    <p className="text-green-600 font-medium">
      All stock items are above minimum stock.
    </p>

  ) : (

    <table className="w-full">

      <thead className="bg-red-500 text-white">

        <tr>

          <th className="text-left p-3">
            Item
          </th>

          <th className="text-left p-3">
            Current Stock
          </th>

          <th className="text-left p-3">
            Minimum Stock
          </th>

        </tr>

      </thead>

      <tbody>

        {dashboard.lowStockItems.map((item) => (

          <tr
            key={item.id}
            className="border-b"
          >

            <td className="p-3">
              {item.itemName}
            </td>

            <td className="p-3 text-red-600 font-semibold">
              {item.openingStock}
            </td>

            <td className="p-3">
              {item.minimumStock}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  )}

</div>
<div className="mt-10 bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold text-blue-600 mb-5">
    🛒 Recent Purchases
  </h2>

  <table className="w-full">

    <thead className="bg-blue-600 text-white">

      <tr>

        <th className="text-left p-3">
          Supplier
        </th>

        <th className="text-left p-3">
          Item
        </th>

        <th className="text-left p-3">
          Quantity
        </th>

        <th className="text-left p-3">
          Total
        </th>

        <th className="text-left p-3">
          Date
        </th>

      </tr>

    </thead>

    <tbody>

      {dashboard.recentPurchases.map((purchase) => (

        <tr
          key={purchase.id}
          className="border-b hover:bg-slate-50"
        >

          <td className="p-3">
            {purchase.supplier.supplierName}
          </td>

          <td className="p-3">
            {purchase.stockItem.itemName}
          </td>

          <td className="p-3">
            {purchase.quantity}
          </td>

          <td className="p-3 text-green-600 font-semibold">
            ₹{purchase.totalAmount}
          </td>

          <td className="p-3">
            {new Date(
              purchase.purchaseDate
            ).toLocaleDateString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
<div className="mt-10 bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold text-green-600 mb-5">
    💰 Recent Sales
  </h2>

  <table className="w-full">

    <thead className="bg-green-600 text-white">

      <tr>

        <th className="text-left p-3">
          Customer
        </th>

        <th className="text-left p-3">
          Item
        </th>

        <th className="text-left p-3">
          Quantity
        </th>

        <th className="text-left p-3">
          Total
        </th>

        <th className="text-left p-3">
          Date
        </th>

      </tr>

    </thead>

    <tbody>

      {dashboard.recentSales.map((sale) => (

        <tr
          key={sale.id}
          className="border-b hover:bg-slate-50"
        >

          <td className="p-3">
            {sale.customer.customerName}
          </td>

          <td className="p-3">
            {sale.stockItem.itemName}
          </td>

          <td className="p-3">
            {sale.quantity}
          </td>

          <td className="p-3 text-green-600 font-semibold">
            ₹{sale.totalAmount}
          </td>

          <td className="p-3">
            {new Date(
              sale.saleDate
            ).toLocaleDateString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Customers
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard.totalCustomers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Suppliers
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard.totalSuppliers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Stock Items
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {dashboard.totalStockItems}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Purchase Amount
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            ₹{dashboard.totalPurchaseAmount}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Sales Amount
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            ₹{dashboard.totalSalesAmount}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Estimated Profit
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-2">
            ₹{dashboard.estimatedProfit}
          </h2>
        </div>

      </div>

    </div>

  </MainLayout>
);

};

export default Dashboard;
