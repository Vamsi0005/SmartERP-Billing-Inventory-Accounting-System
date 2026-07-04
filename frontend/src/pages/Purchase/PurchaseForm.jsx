import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const PurchaseForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
const handleEnter = useEnterNavigation();

  const [suppliers, setSuppliers] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [formData, setFormData] = useState({
    supplierId: "",
    stockItemId: "",
    quantity: "",
    purchasePrice: "",
    gst: "",
    totalAmount: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const [supplierRes, stockRes] = await Promise.all([
        api.get(`/supplier?companyId=${company.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        api.get(`/stock?companyId=${company.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setSuppliers(supplierRes.data.data);
      setStocks(stockRes.data.data);

    } catch (error) {
      toast.error("Failed to load data");
    }
  };


 const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedData = {
    ...formData,
    [name]: value,
  };

  // Auto-fill Purchase Price and GST
  if (name === "stockItemId") {
    const selectedStock = stocks.find(
      (stock) => stock.id === value
    );

    if (selectedStock) {
      updatedData.purchasePrice = selectedStock.purchasePrice;
      updatedData.gst = selectedStock.gst;
    }
  }

  // Auto Calculate Total Amount
  const quantity = Number(updatedData.quantity);
  const purchasePrice = Number(updatedData.purchasePrice);
  const gst = Number(updatedData.gst);

  if (quantity > 0 && purchasePrice > 0) {
    const subtotal = quantity * purchasePrice;
    const gstAmount = (subtotal * gst) / 100;

    updatedData.totalAmount = subtotal + gstAmount;
  } else {
    updatedData.totalAmount = "";
  }

  setFormData(updatedData);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const company = JSON.parse(
      localStorage.getItem("selectedCompany")
    );

    await api.post(
      "/purchase",
      {
        ...formData,
        quantity: Number(formData.quantity),
        purchasePrice: Number(formData.purchasePrice),
        gst: Number(formData.gst),
        totalAmount: Number(formData.totalAmount),
        companyId: company.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Purchase created successfully");

    navigate("/purchase");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to create purchase"
    );

  }
};

useKeyboardShortcuts({

  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/purchase");
  },

});

return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center">

    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
        Create Purchase Voucher
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >

        {/* Supplier */}

        <div>
          <label className="block mb-2 font-medium">
            Supplier <span className="text-red-500">*</span>
          </label>

          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
             onKeyDown={handleEnter}
             autoFocus
            className="w-full border rounded-lg px-4 py-3"
            required
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.supplierName}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Item */}

        <div>
          <label className="block mb-2 font-medium">
            Stock Item <span className="text-red-500">*</span>
          </label>

          <select
            name="stockItemId"
            value={formData.stockItemId}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
            required
          >
            <option value="">Select Stock Item</option>

            {stocks.map((stock) => (
              <option
                key={stock.id}
                value={stock.id}
              >
                {stock.itemName}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}

        <div>
          <label className="block mb-2 font-medium">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder="Enter Quantity"
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        {/* Purchase Price */}

        <div>
          <label className="block mb-2 font-medium">
            Purchase Price
          </label>

          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            readOnly
          />
        </div>

        {/* GST */}

        <div>
          <label className="block mb-2 font-medium">
            GST (%)
          </label>

          <input
            type="number"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            readOnly
          />
        </div>

        {/* Total */}

        <div>
          <label className="block mb-2 font-medium">
            Total Amount
          </label>

          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            className="w-full border rounded-lg px-4 py-3 bg-green-50 font-bold text-green-700"
            readOnly
          />
        </div>

        <button
          type="submit"
          tabIndex={0}
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Purchase
        </button>

      </form>

    </div>

  </div>
);
};

export default PurchaseForm;