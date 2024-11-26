import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../config/api";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");
import { FaUsers, FaCalendarCheck, FaCalendarAlt } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const DashboardOverview = () => {
  const [birthdayEmployees, setBirthdayEmployees] = useState([]); // Store employees with today's birthday
  const [birthdayCustomers, setBirthdayCustomers] = useState([]); // Store customers with today's birthday
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState(""); // Store random birthday image

  // Function to check if the date is today's date
  const isToday = (date) => {
    const today = new Date();
    const dob = new Date(date);
    return (
      today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth()
    );
  };

  // Fetch a random birthday image from Unsplash
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
      setBirthdayImage(response.data.urls.regular); // Store the image URL in state
    } catch (error) {
      console.error("Failed to fetch random birthday image", error);
    }
  };

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const token = sessionStorage.getItem("token"); // Token for authentication

        // Fetch employees
        const employeeResponse = await api.get(`/api/user/all/getalluser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch customers
        const customerResponse = await api.get(
          `/api/customers/get/allCustomer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extract employees and customers Data
        const allEmployees = employeeResponse.data.users;
        const allCustomers = customerResponse.data;

        // Filter employees and customers whose birthday is today
        const birthdayEmployees = allEmployees.filter((employee) => {
          return isToday(employee.dob);
        });

        const birthdayCustomers = allCustomers.filter((customer) => {
          return isToday(customer.dob);
        });

        // If there are birthday matches, set the employees and customers for modal display
        if (birthdayEmployees.length > 0 || birthdayCustomers.length > 0) {
          setBirthdayEmployees(birthdayEmployees);
          setBirthdayCustomers(birthdayCustomers);
          setIsModalOpen(true); // Open the Modal
          fetchRandomBirthdayImage(); // Fetch the random birthday image
        }
      } catch (error) {
        console.error("Failed to fetch employee or customer data", error);
      }
    };

    fetchBirthdays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure the effect runs only once after the component mounts

  // Sample data
  const employeeCount = 120;
  const monthlyLeaves = [4, 8, 5, 7, 6, 9, 3, 4, 8, 6, 5, 7]; // Example data for leaves per month
  const monthlyAttendance = [22, 20, 18, 21, 23, 24, 22, 25, 21, 20, 19, 22]; // Example for own attendance per month

  // Chart data for leaves
  const leaveData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Leaves",
        data: monthlyLeaves,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart data for attendance
  const attendanceData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "My Attendance",
        data: monthlyAttendance,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-100 flex-1 p-6 min-h-screen">
      <h1 className="lg:text-2xl md:text-2xl text-xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Employee Count */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaUsers className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Total Employees</h2>
            <p className="text-gray-600 text-2xl font-bold">{employeeCount}</p>
          </div>
        </div>

        {/* Monthly Leaves */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaCalendarAlt className="text-red-500 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Monthly Leaves</h2>
            <p className="text-gray-600 text-2xl font-bold">
              {monthlyLeaves.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>

        {/* Monthly Attendance */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaCalendarCheck className="text-green-500 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Monthly Attendance</h2>
            <p className="text-gray-600 text-2xl font-bold">
              {monthlyAttendance.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leaves Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Employee Leaves Overview
            </h2>

            <select className=" p-1 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200">
              <option value="nawab">Nawab</option>
            </select>
          </div>
          <Bar
            data={leaveData}
            options={{
              responsive: true,
              plugins: { legend: { display: true }, title: { display: false } },
            }}
          />
        </div>

        {/* Attendance Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            My Monthly Attendance
          </h2>
          <Line
            data={attendanceData}
            options={{
              responsive: true,
              plugins: { legend: { display: true }, title: { display: false } },
            }}
          />
        </div>
      </div>

      {birthdayEmployees.length > 0 || birthdayCustomers.length > 0 ? (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white rounded-lg shadow-lg max-w-lg p-6 mx-auto mt-16"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Happy Birthday to:
            </h2>
            {birthdayEmployees.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  Employees:
                </h3>
                <ul className="text-xl font-bold text-green-700 mb-4">
                  {birthdayEmployees.map((employee, index) => (
                    <li key={index}>{employee.name},</li>
                  ))}
                </ul>
              </>
            )}
            {birthdayCustomers.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  Customers:
                </h3>
                <ul className="text-xl font-bold text-green-700 mb-4">
                  {birthdayCustomers.map((customer, index) => (
                    <li key={index}>{customer.name},</li>
                  ))}
                </ul>
              </>
            )}

            <p className="text-lg font-bold text-gray-600 mb-6">
              Wishing them a day filled with joy and success!
            </p>
            {/* <img
              src="/giphy.webp" // Replace with the path to your animated GIF
              alt="Birthday Animation"
              className="w-64 h-64 mx-auto mb-4 birthday-img"
            /> */}
            {birthdayImage && (
              <img
                src={birthdayImage}
                alt="Random Birthday"
                className="w-64 h-64 mx-auto mb-4 birthday-img rounded-md"
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
      ) : null}
    </div>
  );
};

export default DashboardOverview;
