/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaHome, FaChartLine, FaUsers } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { GiCalendar } from "react-icons/gi";
import { SiGoogleforms } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { BiErrorCircle, BiCommentError } from "react-icons/bi";

const HRSidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const navigate = useNavigate();
  const [showHRDropdown, setShowHRDropdown] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleHRDropdown = () => {
    setShowHRDropdown((prev) => !prev);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    setSidebarToggle(false);
  }, [pathname]);

  return (
    <aside
      className={`lg:w-64 md:w-64 w-[60%] lg:static absolute z-[2] min-h-screen bg-custom-dark-blue px-4 pt-4 transition-transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
      aria-label="Sidebar"
    >
      <ul className="space-y-2 text-white min-h-full overflow-y-auto   font-semibold">
        {/* Dashboard Link */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaHome className="text-blue-400 w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </button>
        </li>

        {/* Emp Registration */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/register" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/register")}
            className="flex items-center w-full px-2 text-left"
          >
            <SiGoogleforms className="text-green-400 w-5 h-5 mr-3" />
            <span>Emp Registration</span>
          </button>
        </li>

        {/* Work Sheet */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/worksheet" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/worksheet")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaSheetPlastic className="text-yellow-400 w-5 h-5 mr-3" />
            <span>Work Sheet</span>
          </button>
        </li>

        {/* Attendance */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/attendance" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/attendance")}
            className="flex items-center w-full px-2 text-left"
          >
            <GiCalendar className="text-red-400 w-5 h-5 mr-3" />
            <span>Attendance</span>
          </button>
        </li>

        {/* Leave Applications */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/leaves" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/leaves")}
            className="flex items-center w-full px-2 text-left"
          >
            <FcLeave className="w-5 h-5 mr-3" />
            <span>Leave Applications</span>
          </button>
        </li>

        {/* Alerts */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/alerts" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/alerts")}
            className="flex items-center w-full px-2 text-left"
          >
            <BiErrorCircle className="text-red-500 w-5 h-5 mr-3" />
            <span>Alerts</span>
          </button>
        </li>

        {/* Issues */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/issues" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/issues")}
            className="flex items-center w-full px-2 text-left"
          >
            <BiErrorCircle className="text-yellow-500 w-5 h-5 mr-3" />
            <span>Issues</span>
          </button>
        </li>

        {/* Client Complain */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/client/complain" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/client/complain")}
            className="flex items-center w-full px-2 text-left"
          >
            <BiCommentError className="text-purple-500 w-5 h-5 mr-3" />
            <span>Client Complain</span>
          </button>
        </li>

        {/* Report Dropdown */}
        <li>
          <button
            onClick={toggleHRDropdown}
            className="flex items-center justify-between w-full px-2 py-3 hover:bg-blue-800 rounded-lg transition-all"
          >
            <span className="flex items-center">
              <FaChartLine className="text-cyan-400 w-5 h-5 mr-3" />
              Report
            </span>
            <MdKeyboardArrowDown
              className={`transform ${showHRDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showHRDropdown && (
            <ul className="ml-6 list-none mt-2 space-y-1">
              <li>
                <button
                  onClick={() =>
                    handleNavigate("/hr/report/view_emp-registration")
                  }
                  className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                    pathname === "/hr/report/view_emp-registration"
                      ? "bg-blue-800"
                      : ""
                  }`}
                >
                  <FaUsers className="text-cyan-400 w-4 h-4 mr-2" />
                  Emp Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/hr/report/view_worksheet")}
                  className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                    pathname === "/hr/report/view_worksheet"
                      ? "bg-blue-800"
                      : ""
                  }`}
                >
                  <FaSheetPlastic className="text-cyan-400 w-4 h-4 mr-2" />
                  Work Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/hr/report/view_attendance")}
                  className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                    pathname === "/hr/report/view_attendance"
                      ? "bg-blue-800"
                      : ""
                  }`}
                >
                  <GiCalendar className="text-cyan-400 w-4 h-4 mr-2" />
                  Attendance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/hr/report/view_project")}
                  className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                    pathname === "/hr/report/view_project" ? "bg-blue-800" : ""
                  }`}
                >
                  <FaChartLine className="text-cyan-400 w-4 h-4 mr-2" />
                  Project
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Employee Type */}
        <li
          className={`rounded hover:bg-blue-800 py-3 transition-all ${
            pathname === "/hr/employee/type" ? "bg-blue-800" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/hr/employee/type")}
            className="flex items-center w-full px-2 text-left"
          >
            <FaUsers className="text-indigo-400 w-5 h-5 mr-3" />
            <span>Employee Type</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default HRSidebar;
