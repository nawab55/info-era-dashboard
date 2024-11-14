/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaBars,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import ProfileDetails from "../Components/Profile/ProfileDetails";

const HRNavbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null); // State for employee details
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleProfile = async () => {
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
      setIsProfileModalOpen(true);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };
  // Employee Details

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 lg:px-20 md:px-14 px-2 top-0 sticky w-full z-10 h-16 shadow-lg flex items-center">
        <div className="flex flex-1 items-center text-xl text-white space-x-4">
          <FaBars
            className="cursor-pointer block md:hidden"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          />
          <span className="hidden md:block font-semibold">Dashboard</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-bold hidden md:block text-white">
            HR Dashboard
          </p>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-5">
          <button
            className="text-white relative group"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FaUserCircle className="w-8 h-8" />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40 text-center">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <button
                      className="flex items-center justify-start w-full px-4 py-2 space-x-2 hover:bg-gray-100 rounded-t-lg transition-colors duration-200"
                      onClick={handleProfile}
                    >
                      <FaUser className="text-blue-500" />
                      <span>Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center justify-start w-full px-4 py-2 space-x-2 hover:bg-gray-100 rounded-b-lg transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="text-red-500" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
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

function ProfileModal({ isOpen, onClose, employeeDetails }) {
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
}
