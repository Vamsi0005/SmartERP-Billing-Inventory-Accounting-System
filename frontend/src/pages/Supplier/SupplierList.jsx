


import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";


const SupplierList = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");

      const company = JSON.parse(
        localStorage.getItem("selectedCompany")
      );

      const response = await api.get(
        `/supplier?companyId=${company.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuppliers(response.data.data);

    } catch (error) {

      toast.error("Failed to load suppliers");

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/supplier/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Supplier deleted successfully");

      fetchSuppliers();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete supplier"
      );

    }

  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.mobileNumber.includes(search)
  );

  useKeyboardShortcuts({

  onNew: () => {
    navigate("/suppliers/create");
  },

  onSearch: () => {
    searchRef.current?.focus();
  },

  onRefresh: () => {
    fetchSuppliers();
    toast.success("Supplier list refreshed");
  },

});

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Supplier Ledger
          </h1>

          <button
            onClick={() => navigate("/suppliers/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Supplier
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">

            <input
  ref={searchRef}
  type="text"
              placeholder="🔍 Search supplier by name or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="text-left p-4">
                  Supplier Name
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

              {filteredSuppliers.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500"
                  >
                    No suppliers found.
                  </td>

                </tr>

              ) : (

                filteredSuppliers.map((supplier) => (

                  <tr
                    key={supplier.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">
                      {supplier.supplierName}
                    </td>

                    <td className="p-4">
                      {supplier.mobileNumber}
                    </td>

                    <td className="p-4">
                      {supplier.address}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹{supplier.openingBalance}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          navigate(`/suppliers/edit/${supplier.id}`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(supplier.id)}
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

export default SupplierList;