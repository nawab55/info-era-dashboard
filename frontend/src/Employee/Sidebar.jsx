/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHome, FaRegFileAlt, FaCircle } from "react-icons/fa";
import { GiCalendar, GiReceiveMoney } from "react-icons/gi";
import { FcLeave } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md"; // Import the new icon
import { FaSheetPlastic } from "react-icons/fa6";

const Sidebar = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const [showHRDropdown, setShowHRDropdown] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleHRDropdown = () => {
    setShowHRDropdown((prev) => !prev);
  };

  // console.log("Sidebar rendered, sidebarToggle:", sidebarToggle);
  return (
    <aside
      className={` z-50 w-52 fixed left-0 h-screen bg-custom-dark-blue px-2 transition-transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0  overflow-y-auto`}
      aria-label="Sidebar"
    >
      <hr className="border-gray-600" />
      <ul className="py-1 text-white font-bold">
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/employee")}
            className="px-1 w-full text-left"
          >
            <FaHome className="inline-block w-5 h-5 mr-4 -mt-2" />
            Home
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/employee/dailysheet")}
            className="px-1 w-full text-left"
          >
            <FaSheetPlastic className="inline-block w-5 h-5 mr-4 -mt-2" />
            Daily Sheet
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/employee/worklist")}
            className="px-1 w-full text-left"
          >
            <FaRegFileAlt className="inline-block w-5 h-5 mr-4 -mt-2" />
            Work List
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/employee/attendance")}
            className="px-1 w-full text-left"
          >
            <GiCalendar className="inline-block w-5 h-5 mr-4 -mt-2" />
            Attendance
          </button>
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/employee/salary")}
            className="px-1 w-full text-left"
          >
            <GiReceiveMoney className="inline-block w-5 h-5 mr-4 -mt-2" />
            Salary
          </button> 
        </li>
        <li className="mb-1 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/employee/leave")}
            className="px-1 w-full text-left"
          >
            <FcLeave className="inline-block w-5 h-5 mr-4 -mt-2" />
            Leave History
          </button>
        </li>

        <li className="">
          <button
            onClick={toggleHRDropdown}
            className="px-3 py-2 w-full text-left flex items-center hover:bg-custom-hover-blue rounded"
          >
            <img
              src="/hr.png"
              alt="HR"
              className="inline-block w-5 h-5 mr-4 -mt-2"
            />
            HR
            <MdKeyboardArrowDown className="ml-auto" size={20} /> {/* Use the new icon */}
          </button>
          {showHRDropdown && (
            <ul className="">
              <li className=" rounded hover:shadow hover:bg-custom-hover-blue py-2 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/employee/hr/offer-letter ")}
                  className="px-1 text-sm w-full text-left"
                >
                  Offer Letter
                </button>
              </li>
              <li className=" rounded hover:shadow hover:bg-custom-hover-blue py-2 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/employee/hr/increment-letter")}
                  className="px-1 text-sm w-full text-left"
                >
                  Increment Letter
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
