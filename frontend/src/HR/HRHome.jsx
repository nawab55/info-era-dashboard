import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../config/api";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");

const HRHome = () => {
  const [birthdayEmployees, setBirthdayEmployees] = useState([]); // Store employees with today's birthday
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = sessionStorage.getItem("token"); // Token for authentication
        const response = await api.get(`/api/user/all/getalluser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Log the response to debug
        console.log(response.data);
        
        if (response.data) {
          const allEmployees = response.data.users;
          
          // Get today's date
          const today = new Date();

          // Find all employees whose birthday is today
          const birthdayUsers = allEmployees.filter((employee) => {
            const dob = new Date(employee.dob); // Convert dob to Date object
            return (
              today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth()
            );
          });

          // Log birthday users for debugging
          console.log(birthdayUsers);

          // If there are birthday matches, set the employees for modal display
          if (birthdayUsers.length > 0) {
            setBirthdayEmployees(birthdayUsers);
            setIsModalOpen(true); // Open the modal
          }
        }
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };

    fetchEmployees();
  }, []); // Make sure the effect runs only once after the component mounts

  return (
    <section className="md:ml-52 mt-16 bg-blue-gray-50 px-4 py-6">
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

      {birthdayEmployees.length > 0 && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white rounded-lg shadow-lg max-w-lg p-6 mx-auto mt-12"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Happy Birthday to:
            </h2>
            <ul className="text-xl font-bold text-blue-800 mb-6">
              {birthdayEmployees.map((employee, index) => (
                <li key={index}>
                  {employee.name}
                </li>
              ))}
            </ul>
            <p className="text-lg text-gray-600 mb-6">
              Wishing him a day for filled with joy and success!
            </p>
            <img
              src="/giphy.webp" // Replace with the path to your animated GIF
              alt="Birthday Animation"
              className="w-64 h-64 mx-auto mb-4 birthday-img"
            />
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

export default HRHome;
