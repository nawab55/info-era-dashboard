import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomModal from "../../../Components/Modal/CustomModal"; // Import custom modal component

const Activity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null); // To hold the activity to be edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

  // Function to fetch activities from the backend
  const fetchActivities = async () => {
    try {
      const response = await api.get("/api/activities/get-all-activities");
      const activitiesData = response.data.activities;
      console.log(activitiesData);

      if (Array.isArray(activitiesData)) {
        setActivities(activitiesData);
      } else {
        console.error("Unexpected data format:", activitiesData);
        toast.error("Unexpected data format");
        setActivities([]);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to fetch activities");
      setActivities([]);
    }
  };

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Function to handle delete action
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/activities/delete-activity/${id}`);
      toast.success("Activity deleted successfully");
      fetchActivities(); // Refresh the activities list
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  // Function to handle opening modal
  const openModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  // Function to handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  return (
    <section className="md:ml-60 bg-inherit p-4 pb-8">
      <div className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md" style={{ height: "600px", border: '1px solid white' }}>
        <div className="flex justify-between items-center pb-8 border-b-2 border-gray-400">
          <h2 className="text-2xl font-semibold text-gray-500">Activity List</h2>
          <button
            onClick={() => navigate('/admin/add-activity')}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
          >
            Add New
          </button>
        </div>

        {/* Table to display activities */}
        <div className="mt-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-slate-300">
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Image/PDF</th>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <tr key={activity._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{activity.title}</td>
                    <td className="px-4 py-2 border text-center">{new Date(activity.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border text-center">
                      {activity.image && (
                        <button
                          onClick={() => window.open(activity.image, "_blank")}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEye />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => openModal(activity)}
                        className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transform hover:-translate-y-1 transition-transform duration-300"
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleDelete(activity._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transform hover:-translate-y-1 transition-transform duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                    No activities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal for Editing Activity */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">Edit Activity</h2>
        {selectedActivity && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formDataToSend = new FormData();
              formDataToSend.append('title', selectedActivity.title);
              if (selectedActivity.image) {
                formDataToSend.append('image', selectedActivity.image);
              }
              try {
                await api.put(`/api/activities/update-activity/${selectedActivity._id}`, formDataToSend, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                toast.success("Activity updated successfully");
                fetchActivities(); // Refresh the activities list
                closeModal(); // Close the modal
              } catch (error) {
                console.error("Error updating activity:", error);
                toast.error("Failed to update activity");
              }
            }}
            className="grid grid-cols-1 gap-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Activity Title"
                value={selectedActivity.title}
                onChange={(e) => setSelectedActivity({ ...selectedActivity, title: e.target.value })}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 transition-all duration-150 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setSelectedActivity({ ...selectedActivity, image: e.target.files[0] })}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 transition-all duration-150 ease-in-out"
              />
            </div>
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transform hover:-translate-y-1 transition-transform duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </CustomModal>
    </section>
  );
};

export default Activity;

