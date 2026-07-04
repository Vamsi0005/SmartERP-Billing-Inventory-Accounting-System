
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const SaleList = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  fetchSales();
}, [filter]);

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/sale?companyId=${company.id}&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales(response.data.data);

    } catch (error) {

      toast.error("Failed to load sales");

    }
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.customer.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      sale.stockItem.itemName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useKeyboardShortcuts({

  onNew: () => {
    navigate("/sales/create");
  },

  onSearch: () => {
    searchRef.current?.focus();
  },

  onRefresh: () => {
    fetchSales();
    toast.success("Sales list refreshed");
  },

});

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Sales Voucher
          </h1>

          <button
            onClick={() => navigate("/sales/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + New Sale
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">

            <input
              ref={searchRef}
              type="text"
              placeholder="🔍 Search by customer or stock item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>
          <div className="flex gap-3 p-4 border-b">

  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded-lg ${
      filter === "all"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("today")}
    className={`px-4 py-2 rounded-lg ${
      filter === "today"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Today
  </button>

  <button
    onClick={() => setFilter("week")}
    className={`px-4 py-2 rounded-lg ${
      filter === "week"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    This Week
  </button>

  <button
    onClick={() => setFilter("month")}
    className={`px-4 py-2 rounded-lg ${
      filter === "month"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    This Month
  </button>

</div>

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Item
                </th>

                <th className="text-left p-4">
                  Quantity
                </th>

                <th className="text-left p-4">
                  Selling Price
                </th>

                <th className="text-left p-4">
                  GST
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSales.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-8 text-gray-500"
                  >
                    No sales found.
                  </td>

                </tr>

              ) : (

                filteredSales.map((sale) => (

                  <tr
                    key={sale.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">
                      {sale.customer.customerName}
                    </td>

                    <td className="p-4">
                      {sale.stockItem.itemName}
                    </td>

                    <td className="p-4">
                      {sale.quantity}
                    </td>

                    <td className="p-4">
                      ₹{sale.sellingPrice}
                    </td>

                    <td className="p-4">
                      {sale.gst}%
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹{sale.totalAmount}
                    </td>

                    <td className="p-4">
                      {new Date(
                        sale.saleDate
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
};

export default SaleList;