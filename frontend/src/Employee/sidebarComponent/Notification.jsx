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
        return <MdCheckCircle className="bg-green-700 text-white rounded-full" />;
      case "Info":
        return <BiErrorCircle className="bg-blue-700 text-white rounded-full" />;
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
    <section className="md:ml-56 mt-16 bg-gray-50 p-4">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        </div>
        <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
          <CiCalendar className="mr-2" />
          {todayDate} {/* Display today's date */}
        </button>
      </div>

      {/* Alerts List */}
      <div className="mt-6 space-y-4">
        {currentAlerts.length === 0 ? (
          <p className="text-gray-700">No alerts available.</p>
        ) : (
          currentAlerts.map((alert, index) => (
            <div
              key={index}
              className={`${getBackgroundColor(
                alert.alertType
              )} p-3 rounded-lg shadow-md flex justify-between items-start space-x-4`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl my-auto">{getIcon(alert.alertType)}</div>
                <div>
                  <h3 className="text-lg font-semibold">{alert.title}</h3>
                  <p className="text-gray-700">{alert.message}</p>
                </div>
              </div>
              {/* Display the created date on the right side */}
              <div className="text-gray-700 text-sm my-auto">
                {moment(alert.createdAt, "Do MMMM YYYY, h:mm:ss a").format("D MMMM, YYYY")}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {alerts.length > alertsPerPage && (
        <div className="mt-6 flex justify-center space-x-2">
          {pageNumber.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === number
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border-purple-600"
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
