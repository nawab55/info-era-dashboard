import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCheckCircle, MdClose, MdError, MdWarning } from "react-icons/md";
import CustomModal from "../../Components/Modal/CustomModal";
import api from "../../config/api";
import { toast } from "react-toastify";
import moment from "moment";

const Alerts = () => {
  const [openModal, setOpenModal] = useState(false);
  const [alertType, setAlertType] = useState(""); // State for the dropdown alert type
  const [title, setTitle] = useState(""); // State for the title
  const [message, setMessage] = useState(""); // State for the message
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const alertsPerPage = 6; // Number of alerts per page

  // Fetch alerts from the backend
  const fetchAlerts = async () => {
    try {
      const response = await api.get("/api/message/alerts");
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAlert = {
      alertType,
      title,
      message,
    };
    try {
      await api.post("/api/message/alerts", newAlert, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      toast.success("Alert is generated successfully");
      fetchAlerts(); // Fetch updated alerts
      handleModal(); // Close the modal
    } catch (error) {
      console.error("Error creating alert", error);
    }
  };

  // Function to return the appropriate icon and background color based on alert type
  const getIcon = (type) => {
    switch (type) {
      case "Success":
        return (
          <MdCheckCircle className="text-white bg-green-700 rounded-full" />
        );
      case "Info":
        return (
          <BiErrorCircle className="text-white bg-blue-700 rounded-full" />
        );
      case "Warning":
        return <MdWarning className="text-yellow-600 rounded-full" />;
      case "Danger":
        return <MdError className="text-white bg-red-600 rounded-full" />;
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
    <section className="flex-1 min-h-screen p-4 bg-gray-50">
      {/* Top Card Section */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-blue-50">
        <div className="flex items-center my-auto">
          <div className="w-2 h-8 mr-3 bg-purple-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        </div>

        <button
          onClick={handleModal}
          className="flex items-center px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          <BiErrorCircle className="mr-2" />
          Add Alert
        </button>
      </div>

      {/* Alerts List */}
      <div className="mt-6 space-y-4">
        {currentAlerts.map((alert, index) => (
          <div
            key={index}
            className={`${getBackgroundColor(
              alert.alertType
            )} bg-blue-50 p-3 rounded-lg shadow-md flex justify-between items-start space-x-4`}
          >
            <div className="flex items-center space-x-4">
              <div className="my-auto text-3xl">{getIcon(alert.alertType)}</div>
              <div className="">
                <h3 className="text-lg font-semibold">{alert.title}</h3>
                <p className="text-gray-700">{alert.message}</p>
              </div>
            </div>
            {/* Display the created date on the right side */}
            <div className="my-auto text-sm text-gray-700">
              {moment(alert.createdAt, "Do MMMM YYYY, h:mm:ss a").format(
                "D MMMM, YYYY"
              )}
              {/* {alert.createdAt} */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
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

      {/* Custom Modal Section */}
      <CustomModal isOpen={openModal} onClose={handleModal}>
        <div className="w-full p-6 rounded-lg shadow-lg bg-blue-50">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-2 py-2 mb-2 bg-white rounded-lg">
            <div className="flex items-center my-auto">
              <div className="w-2 mr-3 bg-purple-600 rounded-full h-7"></div>
              <h2 className="text-xl font-semibold">Add Alert</h2>
            </div>
            <button onClick={handleModal} className="text-2xl">
              <MdClose />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {/* Alert Type Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Alert Type</label>
              <select
                name="alertType"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              >
                <option value="">Select Alert Type</option>
                <option value="Success">Success</option>
                <option value="Info">Info</option>
                <option value="Warning">Warning</option>
                <option value="Danger">Danger</option>
              </select>
            </div>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Add Alert
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </section>
  );
};

export default Alerts;
