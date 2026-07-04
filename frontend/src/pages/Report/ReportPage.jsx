import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

import StockReport from "./StockReport";
import PurchaseReport from "./PurchaseReport";
import SalesReport from "./SalesReport";

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState("stock");

  const tabs = [
  "stock",
  "purchase",
  "sales",
];

useEffect(() => {

  const handleKeyDown = (e) => {

    const tag = document.activeElement?.tagName;

    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ) {
      return;
    }

    const currentIndex = tabs.indexOf(activeTab);

    switch (e.key) {

      case "ArrowRight":
        e.preventDefault();

        setActiveTab(
          tabs[(currentIndex + 1) % tabs.length]
        );

        break;

      case "ArrowLeft":
        e.preventDefault();

        setActiveTab(
          tabs[
            (currentIndex - 1 + tabs.length) %
            tabs.length
          ]
        );

        break;

      case "Home":
        e.preventDefault();
        setActiveTab("stock");
        break;

      case "End":
        e.preventDefault();
        setActiveTab("sales");
        break;
case "F10":
  e.preventDefault();

  document
    .querySelector("[data-download-pdf]")
    ?.click();

  break;

      default:
        break;

    }

  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );

}, [activeTab]);

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          Reports
        </h1>

        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setActiveTab("stock")}
            className={`px-5 py-3 rounded-lg font-semibold ${
              activeTab === "stock"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            📦 Stock Report
          </button>

          <button
            onClick={() => setActiveTab("purchase")}
            className={`px-5 py-3 rounded-lg font-semibold ${
              activeTab === "purchase"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            🛒 Purchase Report
          </button>

          <button
            onClick={() => setActiveTab("sales")}
            className={`px-5 py-3 rounded-lg font-semibold ${
              activeTab === "sales"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            💰 Sales Report
          </button>

        </div>

        {activeTab === "stock" && <StockReport />}

        {activeTab === "purchase" && <PurchaseReport />}

        {activeTab === "sales" && <SalesReport />}

      </div>

    </MainLayout>
  );
};

export default ReportPage;