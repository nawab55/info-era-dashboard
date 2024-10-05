/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHome, FaCircle, FaChartLine, FaUsers } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { GiCalendar } from "react-icons/gi";
import { SiGoogleforms } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md"; // Import the new icon
import { FcLeave } from "react-icons/fc";
import { BiErrorCircle } from "react-icons/bi";
import { BiCommentError } from "react-icons/bi";


const HRSidebar = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const [showHRDropdown, setShowHRDropdown] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleHRDropdown = () => {
    setShowHRDropdown((prev) => !prev);
  };
  return (
    <aside
      className={`w-52 z-10 fixed left-0 h-screen bg-custom-dark-blue px-2 transition-transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0  overflow-y-auto`}
      aria-label="Sidebar"
    >
      <hr className="border-gray-600" />
      <ul className="py-2 text-white font-bold">
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr")}
            className="px-1 w-full text-left"
          >
            <FaHome className="inline-block w-5 h-5 mr-2 -mt-2" />
            Dashboard
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/register")}
            className="px-1 w-full text-left"
          >
            <SiGoogleforms className="inline-block w-5 h-5 mr-2 -mt-2" />
            Emp Registeration
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/worksheet")}
            className="px-1 w-full text-left"
          >
            <FaSheetPlastic className="inline-block w-5 h-5 mr-2 -mt-2" />
            Work Sheet
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/attendance")}
            className="px-1 w-full text-left"
          >
            <GiCalendar className="inline-block w-6 h-6 mr-2 -mt-2" />
            Attendance
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/leaves")}
            className="px-1 w-full text-left"
          >
            <FcLeave className="inline-block w-6 h-6 mr-2 -mt-2" />
            Leave Applications
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/alerts")}
            className="px-1 w-full text-left"
          >
            <BiErrorCircle className="inline-block w-6 h-6 mr-2 -mt-2" />
            Alerts
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/issues")}
            className="px-1 w-full text-left"
          >
            <BiErrorCircle className="inline-block w-6 h-6 mr-2 -mt-2" />
            Issues
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/client/complain")}
            className="px-1 w-full text-left"
          >
            <BiCommentError className="inline-block w-6 h-6 mr-2 -mt-2" />
            Client Complain
          </button>
        </li>

        <li className="">
          <button
            onClick={toggleHRDropdown}
            className="px-2 py-2 w-full text-left flex items-center hover:bg-custom-hover-blue rounded"
          >
            <FaChartLine className="inline-block w-5 h-5 mr-2 -mt-2" />
            Report
            <MdKeyboardArrowDown className="ml-auto" size={20} /> {/* Use the new icon */}
          </button>
          {showHRDropdown && (
            <ul className="ml-4">
              <li className=" rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2 flex items-center">
                <FaCircle className="inline-block w-2 h-2" />
                <button
                  onClick={() => handleNavigate("/hr/report/view_emp-registration")}
                  className="px-2 text-sm w-full text-left"
                >
                  Emp Registration
                </button>
              </li>
              <li className=" rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2 flex items-center">
                <FaCircle className="inline-block w-2 h-2" />
                <button
                  onClick={() => handleNavigate("/hr/report/view_worksheet")}
                  className="px-2 text-sm w-full text-left"
                >
                  Work Sheet
                </button>
              </li>
              <li className=" rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2 flex items-center">
                <FaCircle className="inline-block w-2 h-2" />
                <button
                  onClick={() => handleNavigate("/hr/report/view_attendance")}
                  className="px-2 text-sm w-full text-left"
                >
                  Attendance
                </button>
              </li>
              <li className=" rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2 flex items-center">
                <FaCircle className="inline-block w-2 h-2" />
                <button
                  onClick={() => handleNavigate("/hr/report/view_project")}
                  className="px-2 text-sm w-full text-left"
                >
                  Project
                </button>
              </li>
            </ul>
          )}
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2">
          <button
            onClick={() => handleNavigate("/hr/employee/type")}
            className="px-1 w-full text-left"
          >
            <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2" />
            Employee Type
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default HRSidebar;
