import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";


const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const formRef = useRef(null);
const handleEnter = useEnterNavigation();

  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    address: "",
    openingBalance: 0,
  });

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, []);

  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/customer?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const customer = response.data.data.find(
        (item) => item.id === id
      );

      if (customer) {
        setFormData({
          customerName: customer.customerName,
          mobileNumber: customer.mobileNumber,
          address: customer.address,
          openingBalance: customer.openingBalance,
        });
      }

    } catch (error) {
      toast.error("Failed to load customer");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "openingBalance"
          ? Number(e.target.value)
          : e.target.value,
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
          `/customer/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Customer updated successfully");

      } else {

        await api.post(
          "/customer",
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

        toast.success("Customer created successfully");

      }

      navigate("/customers");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to save customer"
      );

    }
  };
  useKeyboardShortcuts({

  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/customers");
  },

});

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-600 text-center">
          {id ? "Edit Customer" : "Create Customer"}
        </h1>

        <form
  ref={formRef}
  onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            onKeyDown={handleEnter}
            autoFocus
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
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
            type="number"
            name="openingBalance"
            placeholder="Opening Balance"
            value={formData.openingBalance}
            onChange={handleChange}
            onKeyDown={handleEnter}
            className="w-full border rounded-lg px-4 py-3"
          />
<button
  type="submit"
  tabIndex={0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {id ? "Update Customer" : "Save Customer"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default CustomerForm;