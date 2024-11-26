/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserCircle,
  FaLock,
  FaFileInvoiceDollar,
  FaServicestack,
  FaCircle,
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const ClientSidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (setSidebarToggle) {
      setSidebarToggle(false);
    }
  }, [pathname, setSidebarToggle]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleDropdown = (section) => {
    setActiveDropdown((prev) => (prev === section ? null : section));
  };

  return (
    <aside
        className={`md:w-64 w-[60%] lg:static  fixed z-[2] min-h-screen bg-custom-dark-blue  px-4 pt-4 transition-transform ${
          sidebarToggle ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
      <ul className="space-y-2 text-white font-semibold min-h-full">
        {/* Dashboard Link */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/client/dashboard_client" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/client/dashboard_client")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaHome className="text-blue-400 w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </button>
        </li>

        {/* Profile */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/client/profile" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/client/profile")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaUserCircle className="text-green-400 w-5 h-5 mr-3" />
            <span>Profile</span>
          </button>
        </li>

        {/* Edit Password */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/client/edit_password" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/client/edit_password")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaLock className="text-red-400 w-5 h-5 mr-3" />
            <span>Edit Password</span>
          </button>
        </li>

        {/* Invoice */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/client/invoice-details" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/client/invoice-details")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaFileInvoiceDollar className="text-yellow-400 w-5 h-5 mr-3" />
            <span>Invoice</span>
          </button>
        </li>

        {/* Service Dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("service")}
            className="flex items-center justify-between w-full px-2 py-3 hover:bg-blue-800 rounded-lg transition-all"
          >
            <span className="flex items-center">
              <FaServicestack className="text-purple-400 w-5 h-5 mr-3" />
              Service
            </span>
            {activeDropdown === "service" ? (
              <MdKeyboardArrowDown size={20} />
            ) : (
              <MdKeyboardArrowRight size={20} />
            )}
          </button>
          {activeDropdown === "service" && (
            <ul className="ml-6 list-none mt-2 space-y-1">
              <li>
                <button
                  onClick={() => handleNavigate("/client/request-complain")}
                  className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                    pathname === "/client/request-complain"
                      ? "bg-blue-800"
                      : ""
                  }`}
                >
                  <FaCircle className="text-purple-400 w-3 h-3 mr-3" />
                  Complain
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/client/upcoming")}
                  className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                    pathname === "/client/upcoming" ? "bg-blue-800" : ""
                  }`}
                >
                  <FaCircle className="text-purple-400 w-3 h-3 mr-3" />
                  Upcoming
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default ClientSidebar;
