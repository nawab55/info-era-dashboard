/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import {
  FaUserAlt,
  FaChartBar,
  FaUserCircle,
  FaProductHunt,
  FaPlus,
  FaTags,
  FaTools,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import './AccountSidebar.css'; // Import the CSS file

const AccountSidebar = ({ sidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const menus = [
    { name: "Dashboard", link: "/account", icon: MdDashboard },
    { name: "Profile", link: "/account/profile", icon: FaUserCircle },
    {
      name: "Product",
      icon: FaProductHunt,
      dropdown: true,
      subMenus: [
        { name: "Add Category", link: "/account/product/addCategory", icon: FaPlus },
        { name: "Add HSN Code", link: "/account/product/addHsnCode", icon: FaTags },
        { name: "Add Services", link: "/account/product/services", icon: FaTools },
      ],
    },
    {
      name: "Customer",
      icon: FaUserAlt,
      dropdown: true,
      subMenus: [
        { name: "New Customer", link: "/account/customer/addCustomer", icon: FiUserPlus },
        { name: "Customer Report", link: "/account/customer/customerReport", icon: FaChartBar },
      ],
    },
    { name: "Domain", link:"/account/domain", icon: FaGlobe },
    { name: "Domain Report", link:"/account/domain/report", icon: FaFileAlt },
    { name: "Generate Bill", link: "/account/invoiceForm", icon: GiMoneyStack },
    { name: "Invoice Report", link: "/account/invoiceReports", icon: FaChartBar },
  ];

  return (
    <aside
      id="logo-sidebar"
      className={`top-0 mt-20 w-48 fixed z-20 border-t left-0 h-screen bg-custom-dark-blue text-gray-100 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
      aria-label="Sidebar"
    >
      <nav className="pt-2 space-y-2 px-1">
        {menus.map((menu, i) => (
          <div key={i} className="relative">
            {menu.dropdown ? (
              <>
                <button
                  className="flex items-center w-full p-2 hover:bg-custom-hover-blue rounded-md focus:outline-none"
                  onClick={() => toggleDropdown(menu.name)}
                >
                  <menu.icon className="mr-3" size={20} />
                  <span>{menu.name}</span>
                  <MdKeyboardArrowDown
                    className={`ml-auto transform transition-transform ${
                      openDropdown === menu.name ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                    openDropdown === menu.name ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {menu.subMenus.map((submenu, j) => (
                    <Link
                      to={submenu.link}
                      key={j}
                      className="flex items-center p-2 pl-6 text-sm hover:bg-custom-hover-blue rounded-md"
                    >
                      <submenu.icon className="mr-3" size={20} />
                      <span>{submenu.name}</span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={menu.link}
                className="flex items-center p-2 hover:bg-custom-hover-blue rounded-md"
              >
                <menu.icon className="mr-3" size={20} />
                <span>{menu.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AccountSidebar;
