import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

const Register = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
const handleEnter = useEnterNavigation();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
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
    const response = await api.post("/auth/register", formData);

    toast.success(response.data.message);

    navigate("/");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration Failed"
    );
  }
};

useKeyboardShortcuts({
  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/");
  },
});
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          SmartERP
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create Your Account
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleEnter}
              placeholder="Enter Name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleEnter}
              placeholder="Enter Email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
               name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyDown={handleEnter}
              placeholder="Enter Phone Number"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
               name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleEnter}
              placeholder="Enter Password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;