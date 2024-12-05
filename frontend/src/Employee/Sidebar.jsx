/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaRegFileAlt } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { GiCalendar } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";
import {SiGooglesheets} from "react-icons/si";

// Define your menu configuration
const menus = [
  {
    name: "Home",
    link: "/employee",
    icon: FaHome,
    iconColor: "text-blue-400",
  },
  {
    name: "Daily Sheet",
    link: "/employee/dailysheet",
    icon: SiGooglesheets,
    iconColor: "text-yellow-400",
  },
  {
    name: "Work List",
    link: "/employee/worklist",
    icon: FaRegFileAlt,
    iconColor: "text-green-400",
  },
  {
    name: "Attendance",
    icon: GiCalendar,
    iconColor: "text-red-400",
    dropdown: true,
    subMenus: [
      {
        name: "Add Attendance",
        link: "/employee/attendance/add",
        icon: <GiCalendar className="text-cyan-400" />,
      },
      {
        name: "View Attendance",
        link: "/employee/attendance/view",
        icon: <GiCalendar className="text-cyan-400" />,
      },
    ],
  },
  {
    name: "Leave Applications",
    link: "/employee/leaves",
    icon: FcLeave,
    iconColor: "",
  },
  {
    name: "Notifications",
    link: "/employee/alerts",
    icon: IoMdNotificationsOutline,
    iconColor: "text-red-500",
  },
  {
    name: "Report a Problem",
    link: "/employee/report-problem",
    icon: BiErrorCircle,
    iconColor: "text-yellow-500",
  },
];

const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
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

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={`lg:w-64 md:w-1/3 w-[60%] lg:static fixed z-[2] min-h-screen bg-custom-dark-blue transition-transform duration-300 ${
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
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors ${
                    openDropdown === menu.name ? "bg-blue-800/50" : ""
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <menu.icon className={`w-5 h-5 ${menu.iconColor}`} />
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
                        className={`flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-blue-800/50 transition-colors ${
                          pathname === submenu.link
                            ? "bg-blue-800 text-white"
                            : ""
                        }`}
                      >
                        <span className="flex items-center space-x-3">
                          {submenu.icon}
                          <span>{submenu.name}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavigate(menu.link)}
                className={`flex items-center w-full px-4 py-2 text-sm text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors ${
                  pathname === menu.link ? "bg-blue-800 text-white" : ""
                }`}
              >
                <menu.icon className={`w-5 h-5 ${menu.iconColor} mr-3`} />
                {menu.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
