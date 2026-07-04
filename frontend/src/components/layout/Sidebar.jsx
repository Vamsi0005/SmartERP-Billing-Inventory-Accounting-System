import {
  FaHome,
  FaUsers,
  FaTruck,
  FaBoxes,
  FaShoppingCart,
  FaFileInvoice,
  FaChartBar,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import useSidebarNavigation from "../../hooks/useSidebarNavigation";

const Sidebar = () => {
   const menuItems = [
  {
    icon: FaHome,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: FaUsers,
    label: "Customer Ledger",
    path: "/customers",
  },
  {
    icon: FaTruck,
    label: "Supplier Ledger",
    path: "/suppliers",
  },
  {
    icon: FaBoxes,
    label: "Stock Items",
    path: "/stock",
  },
  {
    icon: FaShoppingCart,
    label: "Purchase Voucher",
    path: "/purchase",
  },
  {
    icon: FaFileInvoice,
    label: "Sales Voucher",
    path: "/sales",
  },
  {
    icon: FaChartBar,
    label: "Reports",
    path: "/reports",
  },
];

useSidebarNavigation(menuItems);


  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        SmartERP
      </h1>

      <nav className="space-y-3">

        {menuItems.map((item, index) => {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
    isActive
      ? "bg-white text-blue-700 font-semibold shadow"
      : "text-white hover:bg-blue-600"
        }`
      }
    >
      <Icon />
      {item.label}
    </NavLink>
  );
})}

      </nav>

    </div>
  );
};

export default Sidebar;