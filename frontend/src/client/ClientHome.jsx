import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../config/api";

// Ensure the app element is set for accessibility with react-modal
Modal.setAppElement("#root");

const ClientHome = () => {
  const [customer, setCustomer] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState(""); // Store random birthday image

  // Fetch a random birthday image from Unsplash
  const fetchRandomBirthdayImage = async () => {
    try {
      const response = await api.get("https://api.unsplash.com/photos/random", {
        params: { query: "birthday" },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Replace with your Unsplash API key
        },
      });
      setBirthdayImage(response.data.urls.regular); // Store the image URL in state
    } catch (error) {
      console.error("Failed to fetch random birthday image", error);
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerId = sessionStorage.getItem("clientId");
        const token = sessionStorage.getItem("customerToken");
        const response = await api.get(`/api/customers/details/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setCustomer(response.data);

          const today = new Date();
          const dob = new Date(response.data.dob);
          if (
            today.getDate() === dob.getDate() &&
            today.getMonth() === dob.getMonth()
          ) {
            setIsBirthday(true);
            setIsModalOpen(true);
            fetchRandomBirthdayImage();  // Fetch the random birthday image
          }
        }
      } catch (error) {
        console.error("Failed to fetch customer data", error);
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    fetchCustomer();
  }, []);

  return (
    <section className="md:ml-60 px-4 pb-56">
      <div className="bg-white p-8 h-96 border rounded-md shadow-lg mx-4">
        <p className="text-gray-500 font-bold text-2xl mb-6">
          Welcome to the Dashboard
        </p>
        <p className="font-bold text-5xl text-blue-900">
          Info Era Software Services Pvt. Ltd.
        </p>
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
              Happy Birthday, {customer?.name}!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Wishing you a day filled with love and happiness.
            </p>
            {/* <img
              src="/giphy1.webp" // Replace with the path to your animated GIF
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
      )}
    </section>
  );
};

export default ClientHome;

