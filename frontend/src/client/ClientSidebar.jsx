/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaHome,
  FaUserCircle,
  FaLock,
  FaFileInvoiceDollar,
  FaCircle,
  FaServicestack,
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight,} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ClientSidebar = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleDropdown = (section) => {
    setActiveDropdown((prev) => (prev === section ? null : section));
  };

  return (
    <aside
      className={`w-60 z-10 fixed left-0 h-screen bg-custom-dark-blue px-2 transition-transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 overflow-y-auto`}
      aria-label="Sidebar"
    >
      <hr className="border-gray-600" />
      <ul className="py-2 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/client/dashboard_client")}
            className="px-1 w-full text-left"
          >
            <FaHome className="inline-block w-5 h-5 mr-4 -mt-2" />
            Dashboard
          </button>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/client/profile")}
            className="px-1 w-full text-left"
          >
            <FaUserCircle className="inline-block w-5 h-5 mr-4 -mt-1" />
            Profile
          </button>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/client/edit_password")}
            className="px-1 w-full text-left"
          >
            <FaLock className="inline-block w-5 h-5 mr-4 -mt-1" />
            Edit Password
          </button>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/client/invoice-details")}
            className="px-1 w-full text-left"
          >
            <FaFileInvoiceDollar className="inline-block w-5 h-5 mr-4 -mt-1" />
            Invoice
          </button>
        </li>

        <li className="hover:shadow mb-2">
          <button
            onClick={() => toggleDropdown("service")}
            className="px-2 py-2 w-full text-left flex items-center hover:bg-custom-hover-blue rounded"
          >
            {/* <FaHandshake className="inline-block w-5 h-5 mr-4 " /> */}
            <FaServicestack className="inline-block w-5 h-5 mr-4 " />
            Service
            {activeDropdown === "service" ? (
              <MdKeyboardArrowDown className="ml-auto" size={20} />
            ) : (
              <MdKeyboardArrowRight className="ml-auto" size={20} />
            )}
          </button>
          {activeDropdown === "service" && (
            <ul className="">
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/client/request-complain")}
                  className="px-1 text-sm w-full text-left"
                >
                  Complain
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/client/")}
                  className="px-1 text-sm w-full text-left"
                >
                  Upcoming
                </button>
              </li>
              
            </ul>
          )}
        </li>

        {/* <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/client/service")}
            className="px-1 w-full text-left"
          >
            <FaServicestack className="inline-block w-5 h-5 mr-4 -mt-1" />
            Service
          </button>
        </li> */}
      </ul>
    </aside>
  );
};

export default ClientSidebar;
