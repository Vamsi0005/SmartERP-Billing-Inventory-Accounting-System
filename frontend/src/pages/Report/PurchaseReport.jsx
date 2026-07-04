import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { generatePDF } from "../../utils/pdfGenerator";


const PurchaseReport = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchaseReport();
  }, []);

  const fetchPurchaseReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/report/purchase?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPurchases(response.data.data);

    } catch (error) {

      toast.error("Failed to load purchase report");

    }
  };

  const handleDownloadPDF = () => {

  const columns = [
    "Supplier",
    "Item",
    "Quantity",
    "Purchase Price",
    "GST",
    "Total",
    "Date",
  ];

  const rows = purchases.map((purchase) => [

    purchase.supplier.supplierName,

    purchase.stockItem.itemName,

    purchase.quantity,

    `₹${purchase.purchasePrice}`,

    `${purchase.gst}%`,

    `₹${purchase.totalAmount}`,

    new Date(
      purchase.purchaseDate
    ).toLocaleDateString(),

  ]);

  const company = JSON.parse(
    localStorage.getItem("selectedCompany")
  );

  generatePDF({

    title: "Purchase Report",

    companyName:
      company.companyName || company.name,

    columns,

    rows,

  });

};

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
<div className="flex justify-between items-center p-4 border-b">

  <h2 className="text-2xl font-bold text-blue-600">
    Purchase Report
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

          {purchases.map((purchase) => (

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

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default PurchaseReport;