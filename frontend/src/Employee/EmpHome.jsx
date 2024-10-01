import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../config/api";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");

const EmpHome = () => {
  const [employee, setEmployee] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState(""); // Store random birthday image

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
    <section className="md:ml-56 mt-16 bg-blue-gray-50 px-4 py-6">
      <div className="bg-teal-200 p-5 text-center text-gray-700 shadow-lg">Home</div>
      <div className="flex justify-between px-8 bg-orange-100 mt-4 py-5 text-gray-700 shadow-lg">
        <h1>Attendance</h1>
        <div>Value</div>
      </div>
      <div className="flex justify-between px-8 bg-lime-100 mt-4 py-5 text-center text-gray-700 shadow-lg">
        <h1>Leave</h1>
        <div>Value</div>
      </div>
      <div className="flex justify-between px-8 bg-yellow-100 mt-4 py-5 text-center text-gray-700 shadow-lg">
        <h1>Salary</h1>
        <div>Value</div>
      </div>
      <div className="bg-amber-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 1</div>
      <div className="bg-cyan-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 2</div>
      <div className="bg-green-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 3</div>
      <div className="bg-green-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 4</div>

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
