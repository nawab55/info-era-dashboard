import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { toast } from "react-toastify";

const AddActivity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    try {
      const response = await api.post(
        "/api/activities/add-activity",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        // Handle success (e.g., navigate to another page, show a success message)
        console.log("Activity added:", response.data);
        toast.success("Data added successfully");
        navigate("/admin/activity");
      } else {
        // Handle errors (e.g., show an error message)
        console.error("Error adding activity:", response.data);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <section className="md:ml-60 bg-inherit p-4">
      <div className="max-w-full bg-white p-8 mx-4 rounded-lg shadow-md ">
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">
          Add Activity
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4"
          encType="multipart/form-data"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Activity Title"
              value={formData.title}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/activity")}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transform hover:-translate-y-1 transition-transform duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-full h-48 mt-6 bg-white mx-4 rounded-lg shadow-md "></div>
    </section>
  );
};

export default AddActivity;
