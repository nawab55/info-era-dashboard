/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHome, FaCircle, FaChalkboardTeacher, FaFileAlt, } from "react-icons/fa";
import { AiOutlineSolution, AiOutlineTeam, } from 'react-icons/ai';
import { MdEvent, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ sidebarToggle }) => {
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
      } md:translate-x-0  overflow-y-auto`}
      aria-label="Sidebar"
    >
      <hr className="border-gray-600" />
      <ul className="py-2 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-2">
          <button
            onClick={() => handleNavigate("/admin/dashboard_admin")}
            className="px-1 w-full text-left"
          >
            <FaHome className="inline-block w-5 h-5 mr-4 -mt-2" />
            Dashboard
          </button>
        </li>

        <li className="hover:shadow mb-2">
          <button
            onClick={() => toggleDropdown("training")}
            className="px-2 py-2 w-full text-left flex items-center hover:bg-custom-hover-blue rounded"
          >
            <FaChalkboardTeacher className="inline-block w-5 h-5 mr-4 " />
            Training
            {activeDropdown === "training" ? (
              <MdKeyboardArrowDown className="ml-auto" size={20} />
            ) : (
              <MdKeyboardArrowRight className="ml-auto" size={20} />
            )}
          </button>
          {activeDropdown === "training" && (
            <ul className="">
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/add-college")}
                  className="px-1 text-sm w-full text-left"
                >
                  Add College
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/add-student")}
                  className="px-1 text-sm w-full text-left"
                >
                  Add Student
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/training-certificate")}
                  className="px-1 text-sm w-full text-left"
                >
                  Training Certificate
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/print-certificate")}
                  className="px-1 text-sm w-full text-left"
                >
                  Print Certificate
                </button>
              </li>
            </ul>
          )}
        </li>

        <li className="hover:shadow mb-2">
          <button
            onClick={() => toggleDropdown("reports")}
            className="px-2 py-2 w-full text-left flex items-center hover:bg-custom-hover-blue rounded"
          >
            <FaFileAlt className="inline-block w-5 h-5 mr-4 " />
            Reports
            {activeDropdown === "reports" ? (
              <MdKeyboardArrowDown className="ml-auto" size={20} />
            ) : (
              <MdKeyboardArrowRight className="ml-auto" size={20} />
            )}
          </button>
          {activeDropdown === "reports" && (
            <ul className="">
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/college-reports")}
                  className="px-1 text-sm w-full text-left"
                >
                  College Reports
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/student-reports")}
                  className="px-1 text-sm w-full text-left"
                >
                  Student Reports
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/certificate-reports")}
                  className="px-1 text-sm w-full text-left"
                >
                  Certificate Reports
                </button>
              </li>
            </ul>
          )}
        </li>

        <li className="hover:shadow mb-2">
          <button
            onClick={() => toggleDropdown("co-partners")}
            className="px-2 py-2 w-full text-left flex items-center hover:bg-custom-hover-blue rounded"
          >
            {/* <FaHandshake className="inline-block w-5 h-5 mr-4 " /> */}
            <AiOutlineTeam className="inline-block w-5 h-5 mr-4 " />
            Co-Partners
            {activeDropdown === "co-partners" ? (
              <MdKeyboardArrowDown className="ml-auto" size={20} />
            ) : (
              <MdKeyboardArrowRight className="ml-auto" size={20} />
            )}
          </button>
          {activeDropdown === "co-partners" && (
            <ul className="">
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/report_ibc")}
                  className="px-1 text-sm w-full text-left"
                >
                  IBC
                </button>
              </li>
              <li className="rounded hover:shadow hover:bg-custom-hover-blue py-2 my-1 px-4 flex items-center">
                <FaCircle className="inline-block w-2 h-2 mr-4" />
                <button
                  onClick={() => handleNavigate("/admin/report_bbc")}
                  className="px-1 text-sm w-full text-left"
                >
                  BBC
                </button>
              </li>
              
            </ul>
          )}
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-1">
          <button
            onClick={() => handleNavigate("/admin/post-job")}
            className="px-1 w-full text-left"
          >
            <AiOutlineSolution className="inline-block w-5 h-5 mr-4 -mt-2" />
            Jobs
          </button>
        </li>

        {/* <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-1">
          <button 
            onClick={() => handleNavigate("/admin/slider")}
            className="px-1 w-full text-left"
          >
            <FaSlidersH className="inline-block w-5 h-5 mr-4 -mt-2" />
            Slider
          </button>
        </li> */}

        <li className="mb-2 rounded hover:shadow hover:bg-custom-hover-blue py-2 px-1">
          <button
            onClick={() => handleNavigate("/admin/activity")}
            className="px-1 w-full text-left"
          >
            <MdEvent className="inline-block w-5 h-5 mr-4 -mt-2" />
            Activity
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
