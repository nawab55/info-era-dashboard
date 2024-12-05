import { useEffect, useState } from "react";
import { MdDashboard, MdEvent, MdKeyboardArrowDown } from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaBuilding, // For institutional representation
  FaGlobeAmericas, // For business or global representation
  FaFileAlt,
  FaUniversity,
  FaUserGraduate,
  FaCertificate,
  FaPrint,
  FaChartBar,
  FaClipboardList,
  FaBookOpen,
  FaFile,
  FaFileSignature,
  FaQuestionCircle,
} from "react-icons/fa";
import { AiOutlineTeam, AiOutlineSolution } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";

import { useNavigate, useLocation } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
const menus = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: MdDashboard,
    color: "text-yellow-500",
  },
  {
    name: "Training",
    icon: FaChalkboardTeacher,
    color: "text-blue-500",
    dropdown: true,
    subMenus: [
      {
        name: "Add College",
        link: "/admin/add-college",
        icon: FaUniversity, // Changed from FaCircle to a more meaningful university icon
        color: "text-green-500",
      },
      {
        name: "Add Student",
        link: "/admin/add-student",
        icon: FaUserGraduate, // Changed to a student icon
        color: "text-purple-500",
      },
      {
        name: "Training Certificate",
        link: "/admin/training-certificate",
        icon: FaCertificate, // Added a certificate icon
        color: "text-teal-500",
      },
      {
        name: "Print Certificate",
        link: "/admin/print-certificate",
        icon: FaPrint, // Changed to a print icon
        color: "text-orange-500",
      },
    ],
  },
  {
    name: "Reports",
    icon: FaFileAlt,
    color: "text-red-500",
    dropdown: true,
    subMenus: [
      {
        name: "College Reports",
        link: "/admin/college-reports",
        icon: FaChartBar, // Changed to a chart/report icon for colleges
        color: "text-green-500",
      },
      {
        name: "Student Reports",
        link: "/admin/student-reports",
        icon: FaClipboardList, // Added a clipboard list icon for student reports
        color: "text-purple-500",
      },
      {
        name: "Certificate Reports",
        link: "/admin/certificate-reports",
        icon: FaBookOpen, // Changed to a book/document icon for certificate reports
        color: "text-teal-500",
      },
      {
        name: "Jobs Reports",
        link: "/admin/jobs-reports",
        icon: FaFile,
        color: "text-green-500",
      },
      {
        name: "Training Reports",
        link: "/admin/training-reports",
        icon: FaFileSignature,
        color: "text-purple-500",
      },
      {
        name: "Client Query",
        link: "/admin/client-query-reports",
        icon: FaQuestionCircle,
        color: "text-red-500",
      },
    ],
  },
  {
    name: "Co-Partners",
    icon: AiOutlineTeam,
    color: "text-teal-500",
    dropdown: true,
    subMenus: [
      {
        name: "IBC",
        link: "/admin/report_ibc",
        icon: FaBuilding, // Institutional Building icon
        color: "text-green-500",
      },
      {
        name: "BBC",
        link: "/admin/report_bbc",
        icon: FaGlobeAmericas, // Global Business icon
        color: "text-purple-500",
      },
    ],
  },
  {
    name: "Jobs",
    link: "/admin/post-job",
    icon: AiOutlineSolution,
    color: "text-indigo-500",
  },
  {
    name: "Activity",
    link: "/admin/activity",
    icon: MdEvent,
    color: "text-pink-500",
  },
  {
    name: "Consultant",
    link: "/admin/consultant",
    icon: BiSupport,
    color: "text-teal-500",
  },
  {
    name: "Contact",
    link: "/admin/contact",
    icon: FiPhone,
    color: "text-purple-500",
  },
];
// eslint-disable-next-line react/prop-types
const AdminSidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarToggle(false);
  };

  useEffect(() => {
    setSidebarToggle(false);
  }, [pathname, setSidebarToggle]);

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={`lg:w-64 md:w-52 w-[60%] lg:static fixed z-[2] min-h-full bg-custom-dark-blue transition-transform duration-300 ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 space-y-1">
        {menus.map((menu, index) => (
          <div key={index} className="py-1">
            {menu.dropdown ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleDropdown(menu.name)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded hover:bg-blue-800/50 transition-colors ${
                    openDropdown === menu.name ? "bg-blue-800/50" : ""
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <menu.icon className={`w-5 h-5 ${menu.color}`} />
                    <span>{menu.name}</span>
                  </span>
                  <MdKeyboardArrowDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openDropdown === menu.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-200 overflow-hidden ${
                    openDropdown === menu.name
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 space-y-1 mt-1">
                    {menu.subMenus.map((submenu, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigate(submenu.link)}
                        className={`flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded hover:bg-blue-800/50 transition-colors text-nowrap ${
                          pathname === submenu.link
                            ? "bg-blue-800 text-white"
                            : ""
                        }`}
                      >
                        <submenu.icon
                          className={`w-4 h-4 mr-3 ${submenu.color}`}
                        />
                        {submenu.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavigate(menu.link)}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded hover:bg-blue-800/50 transition-colors ${
                  pathname === menu.link ? "bg-blue-800 text-white" : ""
                }`}
              >
                <menu.icon className={`w-5 h-5 mr-3 ${menu.color}`} />
                {menu.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
