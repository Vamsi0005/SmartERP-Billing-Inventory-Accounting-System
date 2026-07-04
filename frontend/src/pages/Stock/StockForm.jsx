import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const StockForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const formRef = useRef(null);
const handleEnter = useEnterNavigation();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    unit: "",
    purchasePrice: "",
    sellingPrice: "",
    gst: "",
    openingStock: "",
    minimumStock: "",
  });

  useEffect(() => {
    if (id) {
      fetchStock();
    }
  }, []);

  const fetchStock = async () => {
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

      const stock = response.data.data.find(
        (item) => item.id === id
      );

      if (stock) {
        setFormData({
          itemName: stock.itemName,
          category: stock.category,
          unit: stock.unit,
          purchasePrice: stock.purchasePrice,
          sellingPrice: stock.sellingPrice,
          gst: stock.gst,
          openingStock: stock.openingStock,
          minimumStock: stock.minimumStock,
        });
      }

    } catch (error) {
      toast.error("Failed to load stock item");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        [
          "purchasePrice",
          "sellingPrice",
          "gst",
          "openingStock",
          "minimumStock",
        ].includes(name)
          ? value === ""
            ? ""
            : Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      if (id) {

        await api.put(
          `/stock/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Stock updated successfully");

      } else {

        await api.post(
          "/stock",
          {
            ...formData,
            companyId: company.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Stock item created successfully");

      }

      navigate("/stock");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to save stock item"
      );

    }
  };

  useKeyboardShortcuts({

  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/stock");
  },

});

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          {id ? "Edit Stock Item" : "Create Stock Item"}
        </h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >

          <div>
            <label className="block mb-2 font-medium">
              Item Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="itemName"
              placeholder="Enter Item Name"
              value={formData.itemName}
              onChange={handleChange}
              autoFocus
              onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category <span className="text-red-500">*</span>
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Stationery">Stationery</option>
              <option value="Medicine">Medicine</option>
              <option value="Hardware">Hardware</option>
              <option value="Grocery">Grocery</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Unit <span className="text-red-500">*</span>
            </label>

            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
               onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Unit</option>
              <option value="Piece">Piece</option>
              <option value="Kg">Kg</option>
              <option value="Gram">Gram</option>
              <option value="Liter">Liter</option>
              <option value="Packet">Packet</option>
              <option value="Box">Box</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Purchase Price
            </label>

            <input
              type="number"
              name="purchasePrice"
              placeholder="Enter Purchase Price"
              value={formData.purchasePrice}
              onChange={handleChange}
               onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Selling Price
            </label>

            <input
              type="number"
              name="sellingPrice"
              placeholder="Enter Selling Price"
              value={formData.sellingPrice}
              onChange={handleChange}
               onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              GST (%)
            </label>

            <input
              type="number"
              name="gst"
              placeholder="Enter GST Percentage"
              value={formData.gst}
              onChange={handleChange}
               onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Opening Stock
            </label>

            <input
              type="number"
              name="openingStock"
              placeholder="Enter Opening Stock"
              value={formData.openingStock}
              onChange={handleChange}
               onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Minimum Stock
            </label>

            <input
              type="number"
              name="minimumStock"
              placeholder="Enter Minimum Stock"
              value={formData.minimumStock}
              onChange={handleChange}
               onKeyDown={handleEnter}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            tabIndex={0}
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {id ? "Update Stock Item" : "Save Stock Item"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default StockForm;