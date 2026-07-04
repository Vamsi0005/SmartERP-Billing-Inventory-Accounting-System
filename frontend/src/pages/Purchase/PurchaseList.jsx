
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const PurchaseList = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  fetchPurchases();
}, [filter]);

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
  `/purchase?companyId=${company.id}&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPurchases(response.data.data);

    } catch (error) {

      toast.error("Failed to load purchases");

    }
  };

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.supplier.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      purchase.stockItem.itemName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useKeyboardShortcuts({

  onNew: () => {
    navigate("/purchase/create");
  },

  onSearch: () => {
    searchRef.current?.focus();
  },

  onRefresh: () => {
    fetchPurchases();
    toast.success("Purchase list refreshed");
  },

});

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Purchase Voucher
          </h1>

          <button
            onClick={() => navigate("/purchase/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + New Purchase
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">

            <input
            ref={searchRef}
              type="text"
              placeholder="🔍 Search by supplier or stock item..."
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
                  Supplier
                </th>

                <th className="text-left p-4">
                  Item
                </th>

                <th className="text-left p-4">
                  Quantity
                </th>

                <th className="text-left p-4">
                  Purchase Price
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

              {filteredPurchases.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-8 text-gray-500"
                  >
                    No purchases found.
                  </td>

                </tr>

              ) : (

                filteredPurchases.map((purchase) => (

                  <tr
                    key={purchase.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">
                      {purchase.supplier.supplierName}
                    </td>

                    <td className="p-4">
                      {purchase.stockItem.itemName}
                    </td>

                    <td className="p-4">
                      {purchase.quantity}
                    </td>

                    <td className="p-4">
                      ₹{purchase.purchasePrice}
                    </td>

                    <td className="p-4">
                      {purchase.gst}%
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹{purchase.totalAmount}
                    </td>

                    <td className="p-4">
                      {new Date(
                        purchase.purchaseDate
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

export default PurchaseList;