import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import api from "../../config/api";
import moment from "moment";

const Notification = () => {
  // Get today's date in "August 25, 2024" format
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const alertsPerPage = 6; // Number of alerts per page

  // Fetch alerts from the backend
  const fetchAlerts = async () => {
    try {
      const response = await api.get("/api/message/alerts");
      // Sort alerts by creation date (latest first)
      const sortedAlerts = response.data.sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt))
      );
      setAlerts(sortedAlerts);
    } catch (error) {
      console.error("Error fetching alerts", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Function to return the appropriate icon and background color based on alert type
  const getIcon = (type) => {
    switch (type) {
      case "Success":
        return (
          <MdCheckCircle className="bg-green-700 text-white rounded-full" />
        );
      case "Info":
        return (
          <BiErrorCircle className="bg-blue-700 text-white rounded-full" />
        );
      case "Warning":
        return <MdWarning className="text-yellow-600 rounded-full" />;
      case "Danger":
        return <MdError className="bg-red-600 text-white rounded-full" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case "Success":
        return "bg-green-100";
      case "Info":
        return "bg-blue-100";
      case "Warning":
        return "bg-yellow-100";
      case "Danger":
        return "bg-red-100";
      default:
        return "bg-gray-50";
    }
  };

  // Pagination Logic
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert); // Alerts already sorted by createdAt

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(alerts.length / alertsPerPage);
  const pageNumber = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  return (
    <section className="flex-1 bg-gradient-to-r from-gray-50 to-blue-50 lg:p-6 p-2">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 border rounded">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-blue-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        </div>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          <CiCalendar className="mr-3 text-xl" />
          <span className="font-semibold">{todayDate}</span>
        </button>
      </div>

      {/* Alerts List */}
      <div className="mt-8 space-y-6">
        {currentAlerts.length === 0 ? (
          <p className="text-center text-gray-600 font-medium text-lg">
            No alerts available. Enjoy your day! 🎉
          </p>
        ) : (
          currentAlerts.map((alert, index) => (
            <div
              key={index}
              className={`${getBackgroundColor(
                alert.alertType
              )} px-5 py-3 rounded border flex justify-between items-center transition transform`}
            >
              <div className="flex items-center space-x-6">
                <div className="text-4xl text-white">
                  {getIcon(alert.alertType)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {alert.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                </div>
              </div>
              {/* Display the created date on the right side */}
              <div className="text-gray-500 text-sm italic">
                {moment(alert.createdAt, "Do MMMM YYYY, h:mm:ss a").format(
                  "D MMMM, YYYY"
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {alerts.length > alertsPerPage && (
        <div className="mt-8 flex justify-center space-x-2">
          {pageNumber.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded font-semibold transition ${
                currentPage === number
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Notification;
