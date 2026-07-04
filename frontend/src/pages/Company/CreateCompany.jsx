import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const CreateCompany = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
const handleEnter = useEnterNavigation();

  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    gstNumber: "",
    financialYear: "",
    state: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/company", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

      navigate("/company");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create company"
      );
    }
  };

useKeyboardShortcuts({
  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/company");
  },
});

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Create Company
        </h1>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number (Optional)"
            value={formData.gstNumber}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="financialYear"
            placeholder="Financial Year (Example: 2025-26)"
            value={formData.financialYear}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Create Company
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateCompany;