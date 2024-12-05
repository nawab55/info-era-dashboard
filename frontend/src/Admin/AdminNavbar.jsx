/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import ProfileDetails from "../Components/Profile/ProfileDetails";
import { User } from "lucide-react";

const AdminNavbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleProfile = async () => {
    setIsProfileModalOpen(true);
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      const response = await api.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeDetails(response.data.user);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 z-20 h-16 shadow-md flex items-center px-4 md:px-8">
        {/* Sidebar Toggle & Branding */}
        <div className="flex items-center flex-1">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-white lg:hidden block"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          />
          <span className="hidden lg:block ml-3 text-lg font-bold text-white">
            <img src="/infoera.png" alt="" className="h-10" />
          </span>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <button
            className="relative text-white"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <User className="w-8 h-8" />
            <div
              className={`absolute right-full mt-2 bg-white rounded transition-all shadow-lg w-40 origin-top-right ${
                isUserMenuOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-50 opacity-0 pointer-events-none"
              }`}
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button
                    className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-200 w-full text-left transition-colors"
                    onClick={handleProfile}
                  >
                    <User className="text-blue-500" />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-200 w-full text-left transition-colors"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </nav>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          employeeDetails={employeeDetails}
        />
      )}
    </>
  );
};

export default AdminNavbar;

const ProfileModal = ({ isOpen, onClose, employeeDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          <FaTimes />
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <FaUserCircle className="text-blue-500 w-10 h-10" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Profile Details
          </h2>
        </div>

        <div className="border-t border-gray-200 pt-4 max-h-[calc(90vh-8rem)] overflow-auto">
          {employeeDetails ? (
            <ProfileDetails employee={employeeDetails} />
          ) : (
            <p className="text-center text-gray-600">
              Profile details not available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
