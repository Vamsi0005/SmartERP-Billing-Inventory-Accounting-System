import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { generatePDF } from "../../utils/pdfGenerator";

const StockReport = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStockReport();
  }, []);

  const fetchStockReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/report/stock?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStocks(response.data.data);

    } catch (error) {

      toast.error("Failed to load stock report");

    }
  };

  const handleDownloadPDF = () => {

  const columns = [
    "Item",
    "Category",
    "Unit",
    "Purchase Price",
    "Selling Price",
    "Stock",
    "Minimum Stock",
  ];

  const rows = stocks.map((item) => [
    item.itemName,
    item.category,
    item.unit,
    `₹${item.purchasePrice}`,
    `₹${item.sellingPrice}`,
    item.openingStock,
    item.minimumStock,
  ]);

  const company = JSON.parse(
    localStorage.getItem("selectedCompany")
  );

  generatePDF({
    title: "Stock Report",
    companyName: company.companyName,
    columns,
    rows,
  });

};

  return (
  <div className="bg-white rounded-xl shadow overflow-hidden">

    <div className="flex justify-between items-center p-4 border-b">

      <h2 className="text-2xl font-bold text-blue-600">
        Stock Report
      </h2>

      <button
       data-download-pdf
        onClick={handleDownloadPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        📄 Download PDF
      </button>

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
            Current Stock
          </th>

          <th className="text-left p-4">
            Minimum Stock
          </th>

          <th className="text-left p-4">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        {stocks.map((stock) => (

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
              {stock.openingStock}
            </td>

            <td className="p-4">
              {stock.minimumStock}
            </td>

            <td className="p-4">

              {stock.openingStock <= stock.minimumStock ? (

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Low Stock
                </span>

              ) : (

                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock
                </span>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
);
};

export default StockReport;