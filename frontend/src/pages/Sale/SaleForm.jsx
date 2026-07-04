import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const SaleForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
const handleEnter = useEnterNavigation();

  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [formData, setFormData] = useState({
    customerId: "",
    stockItemId: "",
    quantity: "",
    sellingPrice: "",
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

      const [customerRes, stockRes] = await Promise.all([
        api.get(`/customer?companyId=${company.id}`, {
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

      setCustomers(customerRes.data.data);
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

    if (name === "stockItemId") {
      const selectedStock = stocks.find(
        (stock) => stock.id === value
      );

      if (selectedStock) {
        updatedData.sellingPrice = selectedStock.sellingPrice;
        updatedData.gst = selectedStock.gst;
      }
    }

    const quantity = Number(updatedData.quantity);
    const sellingPrice = Number(updatedData.sellingPrice);
    const gst = Number(updatedData.gst);

    if (quantity > 0 && sellingPrice > 0) {
      const subtotal = quantity * sellingPrice;
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
        "/sale",
        {
          ...formData,
          quantity: Number(formData.quantity),
          sellingPrice: Number(formData.sellingPrice),
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

      toast.success("Sale created successfully");

      navigate("/sales");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create sale"
      );

    }
  };

  useKeyboardShortcuts({

  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/sales");
  },

});
    return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Create Sales Voucher
        </h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >

          {/* Customer */}

          <div>
            <label className="block mb-2 font-medium">
              Customer <span className="text-red-500">*</span>
            </label>

            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              onKeyDown={handleEnter}
              autoFocus
              className="w-full border rounded-lg px-4 py-3"
              required
            >
              <option value="">Select Customer</option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.customerName}
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

          {/* Selling Price */}

          <div>
            <label className="block mb-2 font-medium">
              Selling Price
            </label>

            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
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
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Total Amount */}

          <div>
            <label className="block mb-2 font-medium">
              Total Amount
            </label>

            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-green-50 font-bold text-green-700"
            />
          </div>

          <button
            type="submit"
            tabIndex={0}
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Save Sale
          </button>

        </form>

      </div>

    </div>
  );
};

export default SaleForm;