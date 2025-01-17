import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaProductHunt,
  FaTags,
  FaTools,
  FaPlus,
  FaUserAlt,
  FaChartBar,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";

// eslint-disable-next-line react/prop-types
const AccountSidebar = ({ sidebarToggle, setSidebarToggle }) => {
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

  const menus = [
    {
      name: "Dashboard",
      link: "/account/dashboard",
      icon: MdDashboard,
      color: "text-yellow-500",
    },
    {
      name: "Product",
      icon: FaProductHunt,
      color: "text-red-500",
      dropdown: true,
      subMenus: [
        {
          name: "Add Category",
          link: "/account/product/addCategory",
          icon: FaPlus,
          color: "text-green-500",
        },
        {
          name: "Add HSN Code",
          link: "/account/product/addHsnCode",
          icon: FaTags,
          color: "text-purple-500",
        },
        {
          name: "Add Services",
          link: "/account/product/services",
          icon: FaTools,
          color: "text-blue-500",
        },
      ],
    },
    {
      name: "Customer",
      icon: FaUserAlt,
      color: "text-teal-500",
      dropdown: true,
      subMenus: [
        {
          name: "New Customer",
          link: "/account/customer/addCustomer",
          icon: FiUserPlus,
          color: "text-orange-500",
        },
        {
          name: "Customer Report",
          link: "/account/customer/customerReport",
          icon: FaChartBar,
          color: "text-pink-500",
        },
      ],
    },
    {
      name: "Domain",
      link: "/account/domain",
      icon: FaGlobe,
      color: "text-blue-600",
    },
    {
      name: "Domain Report",
      link: "/account/domain/report",
      icon: FaFileAlt,
      color: "text-indigo-500",
    },
    {
      name: "Generate Bill",
      link: "/account/invoiceForm",
      icon: GiMoneyStack,
      color: "text-green-600",
    },
    {
      name: "Invoice Report",
      link: "/account/invoiceReports",
      icon: FaChartBar,
      color: "text-pink-600",
    },
  ];

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
                  <div className="pl-4 mt-1 space-y-1">
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
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors ${
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

export default AccountSidebar;
