import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiCalendar, FiDollarSign, FiSmile } from "react-icons/fi";
import api from "../config/api";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");

const EmpHome = () => {
  const [employee, setEmployee] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState(""); // Store random birthday image
  // const [dummyStats, setDummyStats] = useState({
  //   attendance: 92,
  //   leaves: 8,
  //   salary: 50000,
  // });

  // Fetch a random birthday image from Unsplash
  const fetchRandomBirthdayImage = async () => {
    try {
      const response = await api.get("https://api.unsplash.com/photos/random", {
        params: { query: "birthday" },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Unsplash API key
        },
      });
      setBirthdayImage(response.data.urls.regular); // Store the image URL in state
    } catch (error) {
      console.error("Failed to fetch random birthday image", error);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");
        const response = await api.get(`/api/user/details/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setEmployee(response.data.user);

          const today = new Date();
          const dob = new Date(response.data.dob);
          if (
            today.getDate() === dob.getDate() &&
            today.getMonth() === dob.getMonth()
          ) {
            setIsBirthday(true);
            setIsModalOpen(true);
            fetchRandomBirthdayImage(); // Fetch the random birthday image
          }
        }
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <section className="flex-1 bg-blue-gray-50 px-4 py-6">
       <div className="text-center bg-gradient-to-r from-teal-500 to-blue-500 text-white p-6 rounded-lg border">
        <h1 className="text-2xl font-semibold">Welcome, {employee?.name || "Employee"}!</h1>
        <p className="text-lg mt-2">Here&apos;s your dashboard overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg border text-center">
          <FiCalendar className="text-teal-500 text-4xl mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Attendance</h2>
          <p className="text-lg mt-2"></p>
          {/* <p className="text-lg mt-2">{dummyStats.attendance}%</p> */}
        </div>
        <div className="bg-white p-6 rounded-lg border text-center">
          <FiSmile className="text-orange-500 text-4xl mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Leaves Taken</h2>
          <p className="text-lg mt-2"></p>
          {/* <p className="text-lg mt-2">{dummyStats.leaves}</p> */}
        </div>
        <div className="bg-white p-6 rounded-lg border text-center">
          <FiDollarSign className="text-yellow-500 text-4xl mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Salary</h2>
          <p className="text-lg mt-2"></p>
          {/* <p className="text-lg mt-2">₹{dummyStats.salary}</p> */}
        </div>

      </div>
      

      {isBirthday && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white rounded-lg shadow-lg max-w-lg p-6 mx-auto mt-12"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Happy Birthday, {employee?.name}!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Wishing you a day filled with joy and happiness!
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

export default EmpHome;
