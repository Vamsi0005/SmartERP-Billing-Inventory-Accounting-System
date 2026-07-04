
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";
import useListKeyboardNavigation from "../../hooks/useListKeyboardNavigation";
import { useRef } from "react";

const CustomerList = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
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

      setCustomers(response.data.data);

    } catch (error) {

      toast.error("Failed to load customers");

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Customer deleted successfully");

      fetchCustomers();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete customer"
      );

    }

  };
  useKeyboardShortcuts({

  onNew: () => navigate("/customers/create"),

  onSearch: () => searchRef.current?.focus(),

  onRefresh: () => {
    fetchCustomers();
    toast.success("Customer list refreshed");
  },

});

  const filteredCustomers = customers.filter(
    (customer,index) =>
      customer.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.mobileNumber.includes(search)
  );

  const { selectedIndex } =
  useListKeyboardNavigation({

    items: filteredCustomers,

    onEdit: (customer) => {
      navigate(`/customers/edit/${customer.id}`);
    },

    onDelete: (customer) => {
      handleDelete(customer.id);
    },

  });

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Customer Ledger
          </h1>

          <button
            onClick={() => navigate("/customers/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Customer
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">

            <input
  ref={searchRef}
  type="text"
  placeholder="🔍 Search customer by name or mobile..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
/>

          </div>

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="text-left p-4">
                  Customer Name
                </th>

                <th className="text-left p-4">
                  Mobile
                </th>

                <th className="text-left p-4">
                  Address
                </th>

                <th className="text-left p-4">
                  Opening Balance
                </th>

                <th className="text-center p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500"
                  >
                    No customers found.
                  </td>

                </tr>

              ) : (

                filteredCustomers.map((customer,index) => (

                  <tr
                    key={customer.id}
   className={`border-b cursor-pointer transition ${
  index === selectedIndex
    ? "bg-blue-100 border-l-4 border-blue-600"
    : "hover:bg-slate-50"
}`}
                  >

                    <td className="p-4 font-semibold">
                      {customer.customerName}
                    </td>

                    <td className="p-4">
                      {customer.mobileNumber}
                    </td>

                    <td className="p-4">
                      {customer.address}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹{customer.openingBalance}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          navigate(
                            `/customers/edit/${customer.id}`
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(customer.id)
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

export default CustomerList;