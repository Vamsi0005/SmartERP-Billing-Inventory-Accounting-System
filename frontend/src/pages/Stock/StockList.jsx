
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";


const StockList = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/stock?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStocks(response.data.data);

    } catch (error) {

      toast.error("Failed to load stock items");

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stock item?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/stock/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Stock item deleted successfully");

      fetchStocks();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete stock item"
      );

    }

  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.itemName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      stock.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useKeyboardShortcuts({

  onNew: () => {
    navigate("/stock/create");
  },

  onSearch: () => {
    searchRef.current?.focus();
  },

  onRefresh: () => {
    fetchStocks();
    toast.success("Stock list refreshed");
  },

});

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Stock Items
          </h1>

          <button
            onClick={() => navigate("/stock/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Stock Item
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">

            <input
               ref={searchRef}
              type="text"
              placeholder="🔍 Search by item name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="text-left p-4">
                  Item Name
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Unit
                </th>

                <th className="text-left p-4">
                  Purchase Price
                </th>

                <th className="text-left p-4">
                  Selling Price
                </th>

                <th className="text-left p-4">
                  GST
                </th>

                <th className="text-left p-4">
                  Stock
                </th>

                <th className="text-center p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStocks.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center p-8 text-gray-500"
                  >
                    No stock items found.
                  </td>

                </tr>

              ) : (

                filteredStocks.map((stock) => (

                  <tr
                    key={stock.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">
                      {stock.itemName}
                    </td>

                    <td className="p-4">
                      {stock.category}
                    </td>

                    <td className="p-4">
                      {stock.unit}
                    </td>

                    <td className="p-4">
                      ₹{stock.purchasePrice}
                    </td>

                    <td className="p-4">
                      ₹{stock.sellingPrice}
                    </td>

                    <td className="p-4">
                      {stock.gst}%
                    </td>

                    <td className="p-4 font-semibold">
                      {stock.openingStock}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          navigate(`/stock/edit/${stock.id}`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(stock.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

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

export default StockList;











