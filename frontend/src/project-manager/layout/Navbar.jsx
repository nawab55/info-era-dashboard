/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import ProfileDetails from "../../Components/Profile/ProfileDetails";

const Navbar = ({ setSidebarToggle }) => {
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
      setEmployeeDetails(response.data.user);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <>
      <nav 
        className="z-30 flex items-center w-full h-16 px-4 shadow-lg md:px-8"
        style={{
          background: "linear-gradient(to right, #ebf8ff, #3182ce, #2c5282, #1a365d)",
        }}
      >
        <div className="flex items-center flex-1">
          <HiMenuAlt3
            size={26}
            className="block text-white cursor-pointer lg:hidden"
            onClick={() => setSidebarToggle((prev) => !prev)}
          />
          <span className="hidden h-full ml-3 text-lg font-bold text-white lg:block">
            <img src="/infoera.png" alt="Logo" className="h-10" />
          </span>
        </div>

        <div className="justify-start flex-1 hidden lg:flex">
          <p className="text-xl font-bold text-white">Manager Dashboard</p>
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
                    className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors hover:bg-gray-200"
                    onClick={handleProfile}
                  >
                    <User className="text-blue-500" />
                    <span>Profile</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors hover:bg-gray-200"
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

const ProfileModal = ({ isOpen, onClose, employeeDetails }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden transition-all duration-300 ease-in-out transform ${
         isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute text-gray-400 transition-colors duration-200 top-4 right-4 hover:text-gray-600"
            aria-label="Close modal"
          >
            <MdCancel className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
              <FaPencilAlt className="w-16 h-16 text-gray-800 md:w-20 md:h-20" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Profile Details
            </h2>
          </div>

          <div className="border-t pt-6 max-h-[calc(80vh-8rem)] overflow-y-auto custom-scrollbar">
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
    </div>
  );
};

export default Navbar;
