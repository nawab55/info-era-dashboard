/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { FaSheetPlastic as SheetPlasticIcon } from "react-icons/fa6";
import { GiCalendar } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdDashboard } from "react-icons/md";

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

  const menus = [
    {
      name: "Dashboard",
      link: "/project-manager/dashboard",
      icon: MdDashboard,
      color: "text-blue-500"
    },
    {
      name: "Work Sheet",
      link: "/project-manager/add-worksheet",
      icon: SheetPlasticIcon,
      color: "text-yellow-500"
    },
    {
      name: "Attendance",
      link: "/project-manager/attendance",
      icon: GiCalendar,
      color: "text-red-500"
    },
    // ... your other menu items ...
    {
      name: "Reports",
      icon: FaChartLine,
      color: "text-cyan-500",
      dropdown: true,
      subMenus: [
        {
          name: "Work Sheet",
          link: "/project-manager/report/view_worksheet",
          icon: SheetPlasticIcon,
          color: "text-yellow-500"
        },
        {
          name: "View Attendance ",
          link: "/project-manager/report/view-attendance",
          icon: GiCalendar,
          color: "text-teal-500"
        }
      ]
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarToggle && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarToggle(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-20 mt-16 lg:mt-0 w-[240px] md:w-[280px] lg:w-64 bg-custom-dark-blue transform transition-transform duration-300 ease-in-out
          ${
            sidebarToggle
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          flex flex-col h-full
        `}
      >
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="px-3 py-4">
            {menus.map((menu, index) => (
              <div key={index} className="mb-2">
                {menu.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(menu.name)}
                      className={`
                        flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors
                        ${openDropdown === menu.name ? "bg-blue-800/50" : ""}
                      `}
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
                      className={`
                        overflow-hidden transition-all duration-200
                        ${openDropdown === menu.name ? "max-h-96" : "max-h-0"}
                      `}
                    >
                      <div className="pl-4 mt-1 space-y-1">
                        {menu.subMenus.map((submenu, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => handleNavigate(submenu.link)}
                            className={`
                              flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-blue-800/50 transition-colors
                              ${
                                pathname === submenu.link
                                  ? "bg-blue-800 text-white"
                                  : ""
                              }
                            `}
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
                    className={`
                      flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors
                      ${pathname === menu.link ? "bg-blue-800 text-white" : ""}
                    `}
                  >
                    <menu.icon className={`w-5 h-5 mr-3 ${menu.color}`} />
                    {menu.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

// import { useState } from "react";
// import {
//   FaChartLine,
// } from "react-icons/fa";
// import {  FaSheetPlastic as SheetPlasticIcon } from "react-icons/fa6";
// import { GiCalendar } from "react-icons/gi";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   MdKeyboardArrowDown,
//   MdDashboard,
// } from "react-icons/md";

// // eslint-disable-next-line react/prop-types
// const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (menuName) => {
//     setOpenDropdown(openDropdown === menuName ? null : menuName);
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     setSidebarToggle(false);
//   };

//   const menus = [
//     {
//       name: "Dashboard",
//       link: "/project-manager/dashboard",
//       icon: MdDashboard,
//       color: "text-blue-500"
//     },

//     {
//       name: "Work Sheet",
//       link: "/project-manager/add-worksheet",
//       icon: SheetPlasticIcon,
//       color: "text-yellow-500"
//     },
//     {
//       name: "Attendance",
//       link: "/project-manager/attendance",
//       icon: GiCalendar,
//       color: "text-red-500"
//     },
//     {
//       name: "Reports",
//       icon: FaChartLine,
//       color: "text-cyan-500",
//       dropdown: true,
//       subMenus: [
//         {
//           name: "Work Sheet",
//           link: "/project-manager/report/view_worksheet",
//           icon: SheetPlasticIcon,
//           color: "text-yellow-500"
//         },
//       ]
//     },

//   ];

//   return (
//     <aside
//       onClick={(e) => e.stopPropagation()}
//       className={`lg:w-64 md:w-1/3 w-[60%] lg:static fixed z-[2] scroll-auto min-h-full bg-custom-dark-blue transition-transform duration-300 ${
//         sidebarToggle ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0`}
//       aria-label="Sidebar"
//     >
//       {/* <aside
//       onClick={(e) => e.stopPropagation()}
//       className={`lg:w-64 md:w-1/3 w-[60%] lg:static fixed z-[2] bg-custom-dark-blue transition-transform duration-300 ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0 max-h-full overflow-y-auto`}
//       aria-label="Sidebar"
//     >   */}
//       <div className="px-3 py-4 space-y-1 ">
//         {menus.map((menu, index) => (
//           <div key={index} className="py-1">
//             {menu.dropdown ? (
//               <div className="space-y-1">
//                 <button
//                   onClick={() => toggleDropdown(menu.name)}
//                   className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded hover:bg-blue-800/50 transition-colors ${
//                     openDropdown === menu.name ? "bg-blue-800/50" : ""
//                   }`}
//                 >
//                   <span className="flex items-center space-x-3">
//                     <menu.icon className={`w-5 h-5 ${menu.color}`} />
//                     <span>{menu.name}</span>
//                   </span>
//                   <MdKeyboardArrowDown
//                     className={`w-5 h-5 transition-transform duration-200 ${
//                       openDropdown === menu.name ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 <div
//                   className={`transition-all duration-200 overflow-hidden ${
//                     openDropdown === menu.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <div className="pl-4 mt-1 space-y-1">
//                     {menu.subMenus.map((submenu, subIndex) => (
//                       <button
//                         key={subIndex}
//                         onClick={() => handleNavigate(submenu.link)}
//                         className={`flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded hover:bg-blue-800/50 transition-colors ${
//                           pathname === submenu.link ? "bg-blue-800 text-white" : ""
//                         }`}
//                       >
//                         <submenu.icon className={`w-4 h-4 mr-3 ${submenu.color}`} />
//                         {submenu.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 onClick={() => handleNavigate(menu.link)}
//                 className={`flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-200 rounded-lg hover:bg-blue-800/50 transition-colors ${
//                   pathname === menu.link ? "bg-blue-800 text-white" : ""
//                 }`}
//               >
//                 <menu.icon className={`w-5 h-5 mr-3 ${menu.color}`} />
//                 {menu.name}
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
