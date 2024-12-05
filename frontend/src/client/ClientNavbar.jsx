/* eslint-disable react/prop-types */
import { useState } from "react";
import {FaSignOutAlt} from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { IoClose,IoMail, IoCall, IoHome, IoCalendar, IoCard } from 'react-icons/io5';
import {User} from 'lucide-react'


const ClientNavbar = ({ setSidebarToggle }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/client_login");
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
    fetchUserDetails();
  };

  const fetchUserDetails = async () => {
    try {
      const customerId = sessionStorage.getItem("clientId");
      const token = sessionStorage.getItem("customerToken");
      const response = await api.get(`/api/customers/details/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 z-20 h-16 shadow-lg flex items-center px-4 md:px-8">
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
          <p className="text-white text-xl font-bold">Dashboard</p>
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

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        clientDetails={clientDetails}
      />
    </>
  );
};

export default ClientNavbar;




const ProfileModal = ({ isOpen, onClose, clientDetails }) => {

  if(!clientDetails) return null
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div onClick={onClose} className={`${isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'} cursor-pointer transition-opacity fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4`}>
      <div onClick={(e)=>{e.preventDefault();e.stopPropagation()}} className="bg-white cursor-auto rounded w-full max-w-3xl overflow-hidden transition-all duration-300 ease-in-out">
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600   transition-colors duration-200"
            aria-label="Close modal"
          >
            <IoClose className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <div className="relative">
              <img 
                src={clientDetails.profileImage} 
                alt={clientDetails.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-5 h-5 border-2 border-white"></div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {clientDetails.name}
              </h2>
              <p className="text-blue-600  font-medium">Your Profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <InfoItem icon={<IoMail />} label="Email" value={clientDetails.email} />
            <InfoItem icon={<IoCall />} label="Mobile" value={clientDetails.mobile} />
            <InfoItem icon={<IoHome />} label="Address" value={clientDetails.address} />
            <InfoItem icon={<IoCalendar />} label="Date of Birth" value={formatDate(clientDetails.dob)} />
            <InfoItem icon={<IoCard />} label="Aadhar Number" value={clientDetails.aadharNo} />
            <InfoItem icon={<IoCard />} label="GST Number" value={clientDetails.gstNo !== 'nill' ? clientDetails.gstNo : 'Not Provided'} />
            <InfoItem icon={<IoCard />} label="GST Name" value={clientDetails.gstName !== 'nill' ? clientDetails.gstName : 'Not Provided'} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 bg-gray-200  p-3 rounded-lg">
    <div className="text-blue-500 ">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 ">{label}</p>
      <p className="font-medium text-gray-800 ">{value}</p>
    </div>
  </div>
);

