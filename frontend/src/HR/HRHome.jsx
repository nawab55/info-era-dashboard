import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../config/api";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");

const HRHome = () => {
  const [birthdayEmployees, setBirthdayEmployees] = useState([]); // Store employees with today's birthday
  const [birthdayCustomers, setBirthdayCustomers] = useState([]);  // Store customers with today's birthday
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState(""); // Store random birthday image

  // Function to check if the date is today's date
  const isToday = (date) => {
    const today = new Date();
    const dob = new Date(date);
    return today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth();
  }

   // Fetch a random birthday image from Unsplash
  const fetchRandomBirthdayImage = async () => {
    try {
      const response = await api.get("https://api.unsplash.com/photos/random", {
        params: { query: "birthday" },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, 
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
        const customerResponse = await api.get(`/api/customers/get/allCustomer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Extract employees and customers Data
        const allEmployees = employeeResponse.data.users;
        const allCustomers = customerResponse.data;
        
        // Filter employees and customers whose birthday is today
        const birthdayEmployees = allEmployees.filter((employee) => {
          return isToday(employee.dob)
        });
        
        const birthdayCustomers = allCustomers.filter((customer) => {
          return isToday(customer.dob)
        });

        // If there are birthday matches, set the employees and customers for modal display
        if(birthdayEmployees.length > 0 || birthdayCustomers.length > 0) {
          setBirthdayEmployees(birthdayEmployees);
          setBirthdayCustomers(birthdayCustomers);
          setIsModalOpen(true);  // Open the Modal
          fetchRandomBirthdayImage();  // Fetch the random birthday image
        } 
        
      } catch (error) {
        console.error("Failed to fetch employee or customer data", error);
      }
    };

    fetchBirthdays();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <h3 className="text-2xl font-bold text-green-900 mb-2">Employees:</h3>
                <ul className="text-xl font-bold text-green-700 mb-4">
                  {birthdayEmployees.map((employee, index) => (
                    <li key={index}>{employee.name},</li>
                  ))}
                </ul>
              </>
            )}
            {birthdayCustomers.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Customers:</h3>
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
      ) : null }
    </section>
  );
};

export default HRHome;
