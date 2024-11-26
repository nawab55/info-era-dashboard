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

  return (
    <section className="flex-1 overflow-x-scroll bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-4 rounded shadow-lg">
        <h1 className="text-xl md:text-3xl font-bold text-white">
          Your Dashboard
        </h1>
        <div className="flex items-center bg-white text-blue-700 px-3 py-2 rounded shadow-md">
          <CiCalendar className="mr-2 text-xl" />
          <span>{todayDate}</span>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-indigo-800">
          Welcome, {customer?.name || "Guest"}!
        </h2>
        <p className="text-gray-700 mt-2">
          Here&apos;s an overview of your account and activities.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            label: "Total Tickets",
            value: totalTickets || 0,
            color: "bg-gradient-to-r from-blue-400 to-indigo-700 ",
          },
          {
            label: "Closed Tickets",
            value: dashboardData?.closedTickets || 0,
            color: "bg-gradient-to-r from-red-400 to-red-700 ",
          },
          {
            label: "Open Tickets",
            value: dashboardData?.openTickets || 0,
            color: "bg-gradient-to-r from-green-400 to-emerald-700",
          },
          {
            label: "Services",
            value: dashboardData?.services || 0,
            color: "bg-gradient-to-r from-yellow-400 to-orange-700",
          },
          {
            label: "Total Invoices",
            value: totalInvoices || 0,
            color: "bg-gradient-to-r from-purple-400 to-fuchsia-700",
          },
        ].map((card, index) => (
          <CountUp key={index} start={0} end={card.value}>
            {({ containerRef, countUpRef }) => (
              <div
                ref={containerRef}
                className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-white ${card.color}`}
              >
                <h3 className="text-lg md:text-xl font-bold">{card.label}</h3>
                <span
                  ref={countUpRef}
                  className="text-2xl md:text-3xl font-semibold mt-2"
                />
              </div>
            )}
          </CountUp>
        ))}
      </div>

      {/* Birthday Modal */}
      {isBirthday && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white rounded-lg shadow-lg max-w-lg p-6 mx-auto mt-16"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Happy Birthday, {customer?.name}!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Wishing you a day filled with joy and happiness.
            </p>
            {birthdayImage && (
              <img
                src={birthdayImage}
                alt="Random Birthday"
                className="w-64 h-64 mx-auto mb-4 rounded-md"
              />
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ClientHome;
