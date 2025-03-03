import { useState } from "react";
import { 
  FaChartLine, 
  FaUsers, 
} from "react-icons/fa";
import { FaClipboardQuestion, FaSheetPlastic as SheetPlasticIcon } from "react-icons/fa6";
import { GiCalendar } from "react-icons/gi";
import { SiGoogleforms } from "react-icons/si";
import { PiExamFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  MdKeyboardArrowDown, 
  MdDashboard, 
  MdOutlineAddModerator,
  MdAddCard
} from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { BiErrorCircle, BiCommentError } from "react-icons/bi";
import { FilePenLine, List, LucideShieldQuestion, Newspaper } from "lucide-react";
import { RiFileListLine } from "react-icons/ri";
import { TbStatusChange } from "react-icons/tb";

// eslint-disable-next-line react/prop-types
const HRSidebar = ({ sidebarToggle, setSidebarToggle }) => {
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
      link: "/hr",
      icon: MdDashboard,
      color: "text-blue-500"
    },
    {
      name: "Emp Registration",
      link: "/hr/register",
      icon: SiGoogleforms,
      color: "text-green-500"
    },
    {
      name: "Work Sheet",
      link: "/hr/worksheet",
      icon: SheetPlasticIcon,
      color: "text-yellow-500"
    },
    {
      name: "Attendance",
      link: "/hr/attendance",
      icon: GiCalendar,
      color: "text-red-500"
    },
    {
      name: "Leave Applications",
      link: "/hr/leaves",
      icon: FcLeave,
      color: "text-teal-500"
    },
    {
      name: "Alerts",
      link: "/hr/alerts",
      icon: BiErrorCircle,
      color: "text-red-500"
    },
    {
      name: "Issues",
      link: "/hr/issues",
      icon: BiErrorCircle,
      color: "text-yellow-500"
    },
    {
      name: "Client Complain",
      link: "/hr/client/complain",
      icon: BiCommentError,
      color: "text-purple-500"
    },
    {
      name: "Reports",
      icon: FaChartLine,
      color: "text-cyan-500",
      dropdown: true,
      subMenus: [
        {
          name: "Emp Registration",
          link: "/hr/report/view_emp-registration",
          icon: FaUsers,
          color: "text-green-500"
        },
        {
          name: "Work Sheet",
          link: "/hr/report/view_worksheet",
          icon: SheetPlasticIcon,
          color: "text-yellow-500"
        }
      ]
    },

    {
      name: "Assessment",
      icon: PiExamFill,
      color: "text-cyan-500",
      dropdown: true,
      subMenus: [
        {
          name: "Add Question Type",
          link: "/hr/add/question-type",
          icon: LucideShieldQuestion,
          color: "text-green-500"
        },
        {
          name: "Add Question",
          link: "/hr/add/question",
          icon: FaClipboardQuestion,
          color: "text-green-500"
        },
        {
          name: "Add Course",
          link: "/hr/add-course",
          icon: MdAddCard,
          color: "text-orange-500"
        },
        {
          name: "QuestionList Reports",
          link: "/hr/question-list/reports",
          icon: RiFileListLine,
          color: "text-yellow-500"
        },
        {
          name: "Assessment Results",
          link: "/hr/assessment-reports",
          icon: MdOutlineAddModerator,
          color: "text-green-500"
        },
        {
          name: "Assessment Status",
          link: "/hr/assessment-status",
          icon: TbStatusChange,
          color: "text-purple-500"
        }
      ]
    },
    {
      name: "Blog",
      icon: Newspaper,
      color: "text-lime-500",
      dropdown: true,
      subMenus: [
        {
          name: "Add Blog",
          link: "/hr/add-blog",
          icon: FilePenLine,
          color: "text-green-500"
        },
        {
          name: "Blog List",
          link: "/hr/blog-list",
          icon: List,
          color: "text-yellow-500"
        }
      ]
    },
    {
      name: "Employee Type",
      link: "/hr/employee/type",
      icon: FaUsers,
      color: "text-indigo-500"
    },
   
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarToggle && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarToggle(false)}
        />
      )}
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
        {/* <aside
        onClick={(e) => e.stopPropagation()}
        className={`lg:w-64 md:w-1/3 w-[60%] fixed lg:static z-20 scroll-auto min-h-full bg-custom-dark-blue transition-transform duration-300 ${
          sidebarToggle ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
        aria-label="Sidebar"
      > */}
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="px-3 py-4 mb-20 space-y-1 ">
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
                      <div className="pl-4 mt-1 space-y-1">
                        {menu.subMenus.map((submenu, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => handleNavigate(submenu.link)}
                            className={`flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded hover:bg-blue-800/50 transition-colors ${
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
        </div>
      </aside>
    </>
  );
};

export default HRSidebar;