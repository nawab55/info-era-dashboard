/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
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
    navigate("/login");
  };

  const handleProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.user.userId;
      const response = await api.get(`/api/user/${userId}`, {
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
      <nav className="bg-custom-dark-blue px-4 flex justify-between fixed top-0 w-full z-10 h-16">
        <div className="flex items-center text-xl">
          <FaBars
            className="text-white me-4 cursor-pointer block md:hidden"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          />
          <span className="hidden md:block text-white font-semibold">Dashboard</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className=" text-xl text-white font-bold">
            HR Dashboard
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="relative md:w-65">
            <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
              <button className="p-1 focus:outline-none text-gray-200 md:text-black">
                <FaSearch />
              </button>
            </span>
            <input
              type="text"
              className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
            />
          </div>
          <div className="relative">
            <button
              className="text-white group"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <FaUserCircle className="w-6 h-6 mt-1" />
            </button>
            {isUserMenuOpen && (
              <div className="z-10 absolute bg-custom-blue rounded-lg shadow w-32 top-full right-0">
                <ul className="py-2 text-sm text-gray-400 text-center">
                  <li className="hover:text-white">
                    <button onClick={handleProfile}>Profile</button>
                  </li>
                  <li className="hover:text-white">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 mt-10 rounded shadow-lg w-full max-w-3xl overflow-auto relative">
            <button 
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-700 text-3xl p-2"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Profile Details</h2>
            <div className="max-h-[calc(90vh-8rem)] overflow-auto">
              {employeeDetails ? (
                <ProfileDetails employee={employeeDetails} />
              ) : (
                <p>Profile Details not Getting..</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HRNavbar;
