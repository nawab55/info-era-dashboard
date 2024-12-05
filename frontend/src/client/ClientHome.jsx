import { useEffect, useState } from "react";
import Modal from "react-modal";
import { CiCalendar } from "react-icons/ci";
import api from "../config/api";
import CountUp from "react-countup";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");

const ClientHome = () => {
  const [customer, setCustomer] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState("");
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    closedTickets: 0,
    openTickets: 0,
  });
  const todayDate = new Date().toLocaleDateString();

  // Fetch random birthday image
  const fetchRandomBirthdayImage = async () => {
    try {
      const response = await api.get("https://api.unsplash.com/photos/random", {
        params: { query: "birthday" },
        headers: {
          Authorization: `Client-ID ${
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
          }`,
        },
      });
      setBirthdayImage(response.data.urls.regular);
    } catch (error) {
      console.error("Failed to fetch random birthday image", error);
    }
  };

  // count total invoices
  const fetchInvoices = async () => {
    try {
      const customerId = sessionStorage.getItem("clientId");
      const token = sessionStorage.getItem("customerToken");
      const response = await api.get(`/api/invoices/customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.success) {
        setTotalInvoices(response.data.invoices.length);
      } else {
        setTotalInvoices(0);
      }
    } catch (error) {
      console.error("Failed to fetch total invoices", error);
    }
  };

  // count total tickets/complain
  const fetchComplains = async () => {
    try {
      const response = await api.get(
        "/api/complains/get-all/cuctomer-complain",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("customerToken")}`,
          },
        }
      );
      setTotalTickets(response.data.complains.length);
      setDashboardData((prev) => ({
        ...prev,
        openTickets: response.data.complains.filter(
          (complain) =>
            complain.status === "Pending" || complain.status === "In Progress"
        ).length,
        closedTickets: response.data.complains.filter(
          (complain) =>
            complain.status === "Closed" || complain.status === "Resolved"
        ).length,
      }));
    } catch (error) {
      console.error("Error fetching complains", error);
    }
  };

  useEffect(() => {
    const fetchCustomerAndDashboardData = async () => {
      try {
        const customerId = sessionStorage.getItem("clientId");
        const token = sessionStorage.getItem("customerToken");
        // Fetch customer details
        const customerResponse = await api.get(
          `/api/customers/details/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (customerResponse.data) {
          setCustomer(customerResponse.data);
          const today = new Date();
          const dob = new Date(customerResponse.data.dob);
          if (
            today.getDate() === dob.getDate() &&
            today.getMonth() === dob.getMonth()
          ) {
            setIsBirthday(true);
            setIsModalOpen(true);
            fetchRandomBirthdayImage();
          }
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchComplains();
    fetchInvoices();
    fetchCustomerAndDashboardData();
  }, []);

  const dashboardCards = [
    {
      label: "Total Tickets",
      value: totalTickets || 0,
      icon: "📋",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      label: "Closed Tickets",
      value: dashboardData?.closedTickets || 0,
      icon: "✅",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      label: "Open Tickets",
      value: dashboardData?.openTickets || 0,
      icon: "🕒",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      label: "Services",
      value: dashboardData?.services || 0,
      icon: "🛠️",
      gradient: "from-purple-500 to-fuchsia-600"
    },
    {
      label: "Total Invoices",
      value: totalInvoices || 0,
      icon: "💰",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <section className="min-h-screen flex-1 bg-gray-50 p-4 md:p-8 space-y-6">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded shadow-2xl w-full md:w-auto">
        <h1 className="text-xl font-semibold tracking-wide">
          Your Dashboard
        </h1>
      </div>
      
      <div className="flex items-center bg-white rounded border px-4 py-2 space-x-2">
        <CiCalendar className="text-indigo-600" size={24} />
        <span className="text-gray-700 font-medium">{todayDate}</span>
      </div>
    </div>

    {/* Welcome Section */}
    <div className="bg-white rounded border p-6 text-center transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-indigo-800 mb-3">
        Welcome, {customer?.name || "Guest"}!
      </h2>
      <p className="text-gray-600">
        Here&apos;s an overview of your account and recent activities.
      </p>
    </div>

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card, index) => (
        <div 
          key={index} 
          className={`
            bg-gradient-to-br ${card.gradient} 
            rounded-xl shadow-lg transform transition-all 
            duration-300 hover:-translate-y-2 hover:shadow-2xl 
            p-6 text-white flex flex-col items-center justify-center
            ${index===dashboardCards.length-1?'col-span-2':''}
          `}
        >
          <div className="text-4xl mb-3">{card.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{card.label}</h3>
          <CountUp 
            start={0} 
            end={card.value} 
            duration={1.5} 
            className="text-3xl font-bold"
          />
        </div>
      ))}
    </div>

    {/* Birthday Modal */}
    <Modal
      isOpen={isBirthday && isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center relative">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">
          Happy Birthday, {customer?.name}!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Wishing you a day filled with joy, laughter, and wonderful moments.
        </p>
        
        {birthdayImage && (
          <img 
            src={birthdayImage} 
            alt="Birthday Celebration" 
            className="mx-auto rounded-xl mb-6 max-h-64 object-cover" 
          />
        )}
        
        <button 
          onClick={() => setIsModalOpen(false)}
          className="
            bg-indigo-600 text-white 
            px-8 py-3 rounded-lg 
            hover:bg-indigo-700 
            transition-colors 
            font-semibold shadow-md
          "
        >
          Close
        </button>
      </div>
    </Modal>
  </section>
  );
};

export default ClientHome;
