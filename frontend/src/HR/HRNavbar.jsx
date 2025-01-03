/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import {MdCancel} from "react-icons/md"
import {User} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import ProfileDetails from "../Components/Profile/ProfileDetails";

const HRNavbar = ({ setSidebarToggle }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
    fetchUserDetails();
  };

  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.user.userId;
      const response = await api.get(`/api/user/details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.user);
      setEmployeeDetails(response.data.user);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full z-20 h-16 shadow-lg flex items-center px-4 md:px-8"
        style={{
          background: "linear-gradient(to right, #ebf8ff, #3182ce, #2c5282, #1a365d)",
        }}
      >
        <div className="flex flex-1 items-center">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer lg:hidden block text-white"
            onClick={() => setSidebarToggle((prev) => !prev)}
          />
          <span className="hidden lg:block h-full text-lg font-bold text-white ml-3">
            <img src="/infoera.png" alt="Logo" className="h-10" />
          </span>
        </div>

        <div className="flex-1 lg:flex hidden justify-start">
          <p className="text-white text-xl font-bold">HR Dashboard</p>
        </div>

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
                  <div
                    className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-200 w-full text-left transition-colors"
                    onClick={handleProfile}
                  >
                    <User className="text-blue-500" />
                    <span>Profile</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-200 w-full text-left transition-colors"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </nav>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        employeeDetails={employeeDetails}
      />
    </>
  );
};

export default HRNavbar;

const ProfileModal= ({ isOpen, onClose, employeeDetails }) => {

  return (
    <div className={`fixed inset-0 bg-black ${isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'} transition-opacity bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4`}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden transition-all duration-300 ease-in-out transform scale-95  ${isOpen?'scale-100':'scale-90'}`}>
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600  transition-colors duration-200"
            aria-label="Close modal"
          >
            <MdCancel className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-full">
              <FaPencilAlt className="text-gray-800 w-16 h-16 md:w-20 md:h-20" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 ">
              Profile Details
            </h2>
          </div>

          <div className="border-t pt-6 max-h-[calc(80vh-8rem)] overflow-y-auto custom-scrollbar">
            {employeeDetails ? (
              <ProfileDetails employee={employeeDetails} />
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                Profile details not available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};