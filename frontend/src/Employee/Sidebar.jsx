/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaRegFileAlt } from "react-icons/fa";
import { GiCalendar } from "react-icons/gi";
import { FcLeave } from "react-icons/fc";
import { FaSheetPlastic } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { RiArrowRightSFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const navigate = useNavigate();
  const [showAttendanceDropdown, setShowAttendanceDropdown] = useState(false); // Add this state

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleAttendanceDropdown = () => {
    setShowAttendanceDropdown((prev) => !prev); // Add toggle for Attendance dropdown
  };

  const { pathname } = useLocation();

  useEffect(() => {
    setSidebarToggle(false);
  }, [pathname]);

  // console.log("Sidebar rendered, sidebarToggle:", sidebarToggle);
  return (
  
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`lg:w-64 md:w-64 w-[60%] lg:static fixed z-[2] min-h-screen bg-custom-dark-blue px-4 pt-4 transition-transform ${
          sidebarToggle ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <ul className="space-y-2 text-white min-h-full overflow-y-auto font-semibold">
          {/* Home */}
          <li
            className={`rounded hover:bg-blue-800 py-3 transition-all ${
              pathname === "/employee" ? "bg-blue-800" : ""
            }`}
          >
            <button
              onClick={() => handleNavigate("/employee")}
              className="flex items-center w-full px-2 text-left"
            >
              <FaHome className="text-blue-400 w-5 h-5 mr-3" />
              <span>Home</span>
            </button>
          </li>

          {/* Daily Sheet */}
          <li
            className={`rounded hover:bg-blue-800 py-3 transition-all ${
              pathname === "/employee/dailysheet" ? "bg-blue-800" : ""
            }`}
          >
            <button
              onClick={() => handleNavigate("/employee/dailysheet")}
              className="flex items-center w-full px-2 text-left"
            >
              <FaSheetPlastic className="text-yellow-400 w-5 h-5 mr-3" />
              <span>Daily Sheet</span>
            </button>
          </li>

          {/* Work List */}
          <li
            className={`rounded hover:bg-blue-800 py-3 transition-all ${
              pathname === "/employee/worklist" ? "bg-blue-800" : ""
            }`}
          >
            <button
              onClick={() => handleNavigate("/employee/worklist")}
              className="flex items-center w-full px-2 text-left"
            >
              <FaRegFileAlt className="text-green-400 w-5 h-5 mr-3" />
              <span>Work List</span>
            </button>
          </li>

          {/* Attendance Dropdown */}
          <li>
            <button
              onClick={toggleAttendanceDropdown}
              className="flex items-center justify-between w-full px-2 py-3 hover:bg-blue-800 rounded-lg transition-all"
            >
              <span className="flex items-center">
                <GiCalendar className="text-red-400 w-5 h-5 mr-3" />
                Attendance
              </span>
              <MdKeyboardArrowDown
                className={`transform ${
                  showAttendanceDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {showAttendanceDropdown && (
              <ul className="ml-6 list-none mt-2 space-y-1">
                <li>
                  <button
                    onClick={() => handleNavigate("/employee/attendance/add")}
                    className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                      pathname === "/employee/attendance/add"
                        ? "bg-blue-800"
                        : ""
                    }`}
                  >
                    <RiArrowRightSFill className="text-cyan-400 w-4 h-4 mr-2" />
                    Add Attendance
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("/employee/attendance/view")}
                    className={`flex items-center w-full p-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${
                      pathname === "/employee/attendance/view"
                        ? "bg-blue-800"
                        : ""
                    }`}
                  >
                    <RiArrowRightSFill className="text-cyan-400 w-4 h-4 mr-2" />
                    View Attendance
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Leave Applications */}
          <li
            className={`rounded hover:bg-blue-800 py-3 transition-all ${
              pathname === "/employee/leaves" ? "bg-blue-800" : ""
            }`}
          >
            <button
              onClick={() => handleNavigate("/employee/leaves")}
              className="flex items-center w-full px-2 text-left"
            >
              <FcLeave className="w-5 h-5 mr-3" />
              <span>Leave Applications</span>
            </button>
          </li>

          {/* Notifications */}
          <li
            className={`rounded hover:bg-blue-800 py-3 transition-all ${
              pathname === "/employee/alerts" ? "bg-blue-800" : ""
            }`}
          >
            <button
              onClick={() => handleNavigate("/employee/alerts")}
              className="flex items-center w-full px-2 text-left"
            >
              <IoMdNotificationsOutline className="text-red-500 w-5 h-5 mr-3" />
              <span>Notifications</span>
            </button>
          </li>

          {/* Report a Problem */}
          <li
            className={`rounded hover:bg-blue-800 py-3 transition-all ${
              pathname === "/employee/report-problem" ? "bg-blue-800" : ""
            }`}
          >
            <button
              onClick={() => handleNavigate("/employee/report-problem")}
              className="flex items-center w-full px-2 text-left"
            >
              <BiErrorCircle className="text-yellow-500 w-5 h-5 mr-3" />
              <span>Report a Problem</span>
            </button>
          </li>
        </ul>
      </aside>
  );
};

export default Sidebar;
