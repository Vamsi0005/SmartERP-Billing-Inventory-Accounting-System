import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaKeyboard,
} from "react-icons/fa";

const Header = ({ onShowShortcuts }) => {
  const navigate = useNavigate();

  const company = JSON.parse(
    localStorage.getItem("selectedCompany")
  );

  const logout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("selectedCompany");

  navigate("/");
};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F8") {
        e.preventDefault();

        const confirmLogout = window.confirm(
          "Are you sure you want to logout?"
        );

        if (confirmLogout) {
          logout();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-blue-700">
          Gateway of SmartERP
        </h2>

        <p className="text-gray-500">
          {company?.companyName}
        </p>
      </div>

     <div className="flex items-center gap-3">

  <button
    onClick={onShowShortcuts}
    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    <FaKeyboard />
    Shortcuts
  </button>

  <button
    onClick={logout}
    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    <FaSignOutAlt />
    Logout
  </button>

</div>
      
    </header>
  );
};

export default Header;