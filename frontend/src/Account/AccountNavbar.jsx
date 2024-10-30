/* eslint-disable react/prop-types */
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AccountNavbar = ({ setSidebarOpen, sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-custom-dark-blue z-20 h-16">
      <div className="px-3 py-1 lg:px-5 lg:pl-3">
        <div className="flex text-white items-center py-2 justify-between">
          <div className="flex items-center">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="text-lg hidden md:block font-bold ml-2">Dashboard</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="block text-xl font-bold">
              Account Dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 hover:text-gray-200 shadow-md  rounded-md px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AccountNavbar;
