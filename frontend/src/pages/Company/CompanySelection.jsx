import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const CompanySelection = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetchCompanies();
  }, []);

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

    switch (e.key) {

      case "ArrowRight":
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev === companies.length - 1
            ? 0
            : prev + 1
        );

        break;

      case "ArrowLeft":
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev === 0
            ? companies.length - 1
            : prev - 1
        );

        break;

      case "Home":
        e.preventDefault();
        setSelectedIndex(0);
        break;

      case "End":
        e.preventDefault();
        setSelectedIndex(companies.length - 1);
        break;

      case "Enter":
        e.preventDefault();

        if (companies[selectedIndex]) {
          selectCompany(companies[selectedIndex]);
        }

        break;

      case "F2":
        e.preventDefault();
        navigate("/company/create");
        break;

      default:
        break;

    }

  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };

}, [companies, selectedIndex]);

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/company", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies(response.data.data);
    } catch (error) {
      toast.error("Failed to load companies");
    }
  };
  const selectCompany = (company) => {

  localStorage.setItem(
    "selectedCompany",
    JSON.stringify(company)
  );

  toast.success(`${company.companyName} Selected`);

  navigate("/dashboard");
};

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Select Company
          </h1>

          <button
            onClick={() => navigate("/company/create")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            + Create Company
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {companies.map((company,index) => (

            <div
  key={company.id}
  onClick={() => selectCompany(company)}
  className={`bg-white rounded-xl p-6 cursor-pointer transition duration-300 ${
  selectedIndex === index
    ? "shadow-xl scale-105 ring-2 ring-blue-500"
    : "shadow hover:shadow-xl hover:scale-105"
}`}
>

              <h2 className="text-xl font-bold">
                {company.companyName}
              </h2>

              <p className="text-gray-500 mt-2">
                FY : {company.financialYear}
              </p>

              <p className="text-gray-500">
                {company.state}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default CompanySelection;