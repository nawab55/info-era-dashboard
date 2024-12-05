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
import { MdKeyboardArrowDown, MdSyncProblem } from "react-icons/md";

const menus = [
  {
    path: "/client/dashboard_client",
    name: "Dashboard",
    icon: FaHome,
    iconColor: "text-blue-400",
  },
  {
    path: "/client/profile",
    name: "Profile",
    icon: FaUserCircle,
    iconColor: "text-green-400",
  },
  {
    path: "/client/edit_password",
    name: "Edit Password",
    icon: FaLock,
    iconColor: "text-red-400",
  },
  {
    path: "/client/invoice-details",
    name: "Invoice",
    icon: FaFileInvoiceDollar,
    iconColor: "text-yellow-400",
  },
  {
    name: "Services",
    link: "/client/services",
    icon: FaServicestack,
    iconColor: "text-purple-400",
    dropdown: true,
    subMenus: [
      {
        link: "/client/request-complain",
        name: "Complain",
        icon: <MdSyncProblem className="text-cyan-400" />,
      },
      {
        link: "/client/upcoming",
        name: "Upcoming",
        icon: <FaCircle className="text-cyan-400" />,
      },
    ],
  },
];

// eslint-disable-next-line react/prop-types
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
      className={`lg:w-64 md:w-1/3 w-[60%] lg:static fixed z-[2] min-h-screen bg-custom-dark-blue transition-transform duration-300 ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 space-y-2">
        {menus.map((menu, index) => (
          <div key={index} className="py-1">
            {menu.dropdown ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleDropdown(menu.name)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors ${
                    activeDropdown === menu.name ? "bg-blue-800/50" : ""
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <menu.icon className={`w-5 h-5 ${menu.iconColor}`} />
                    <span>{menu.name}</span>
                  </span>
                  <MdKeyboardArrowDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      activeDropdown === menu.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-200 overflow-hidden ${
                    activeDropdown === menu.name
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 space-y-1 mt-1">
                    {menu.subMenus.map((submenu, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigate(submenu.link)}
                        className={`flex items-center w-full px-4 py-3 text-sm text-gray-300 rounded-lg hover:bg-blue-800/50 transition-colors ${
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
                onClick={() => handleNavigate(menu.path)}
                className={`flex items-center w-full px-4 py-3 text-sm font-semibold text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors ${
                  pathname === menu.path ? "bg-blue-800 text-white" : ""
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

export default ClientSidebar;
