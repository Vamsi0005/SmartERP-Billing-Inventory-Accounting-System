import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { generatePDF } from "../../utils/pdfGenerator";


const SalesReport = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSalesReport();
  }, []);

  const fetchSalesReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/report/sales?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales(response.data.data);

    } catch (error) {

      toast.error("Failed to load sales report");

    }
  };

  const handleDownloadPDF = () => {

  const columns = [
    "Customer",
    "Item",
    "Quantity",
    "Selling Price",
    "GST",
    "Total",
    "Date",
  ];

  const rows = sales.map((sale) => [

    sale.customer.customerName,

    sale.stockItem.itemName,

    sale.quantity,

    `₹${sale.sellingPrice}`,

    `${sale.gst}%`,

    `₹${sale.totalAmount}`,

    new Date(
      sale.saleDate
    ).toLocaleDateString(),

  ]);

  const company = JSON.parse(
    localStorage.getItem("selectedCompany")
  );

  generatePDF({

    title: "Sales Report",

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
    Sales Report
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

          {sales.map((sale) => (

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

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default SalesReport;