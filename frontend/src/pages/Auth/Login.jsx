import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";


const Login = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
const handleEnter = useEnterNavigation();

    const [formData, setFormData] = useState({
        email: "",
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
    const response = await api.post("/auth/login", formData);

    // Save JWT Token
    localStorage.setItem("token", response.data.data.token);

    // Save Logged-in User
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data.user)
    );

    toast.success(response.data.message);

    navigate("/company");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  }
};

useKeyboardShortcuts({
  onSave: () => {
    formRef.current?.requestSubmit();
  },

  onCancel: () => {
    navigate("/register");
  },
});

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          SmartERP
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Billing • Inventory • Accounting
        </p>

        <form  ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-5">

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
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;