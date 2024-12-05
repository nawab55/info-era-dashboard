import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, FilePlus } from "lucide-react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const AddActivity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
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
        toast.success("Activity added successfully");
        navigate("/admin/activity");
      } else {
        console.error("Error adding activity:", response.data);
      }
    } catch (error) {
      toast.error("Error submitting form");
      console.log("Error submitting form:", error);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setPreview(null);
  };

  return (
    <div className="min-h-screen flex-1 bg-gray-50 lg:p-6 p-2 flex items-center justify-center">
    <div className="w-full max-w-6xl bg-white border overflow-hidden">
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FilePlus className="mr-3 text-blue-600" size={28} />
            Create New Activity
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700"
            >
              Activity Title
            </label>
            <input 
              id="title" 
              type="text" 
              name="title" 
              placeholder="Enter activity title" 
              value={formData.title} 
              onChange={handleChange} 
              className="
                w-full px-4 py-3
                text-sm text-gray-700 
                border border-gray-300 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-300
                transition-all duration-200
              " 
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label 
              htmlFor="fileInput" 
              className={`
                relative block w-full border-2 border-dashed rounded-lg cursor-pointer 
                ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}
                hover:border-blue-500 
                transition-all duration-300
                group
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg" 
                  />
                  <button 
                    type="button" 
                    onClick={handleRemoveImage} 
                    className="
                      absolute top-3 right-3 
                      bg-red-500 text-white 
                      p-2 rounded-full 
                      hover:bg-red-600
                      transition-colors
                      group-hover:opacity-100
                    "
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div 
                  className="
                    flex flex-col items-center 
                    justify-center p-10 
                    text-center text-gray-500
                    hover:text-blue-600
                  " 
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <ImagePlus size={56} className="text-gray-400 mb-4 group-hover:text-blue-500 transition-colors" />
                  <p className="text-base font-medium">
                    Drag and drop an image or click to upload
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG, up to 10MB
                  </p>
                </div>
              )}
              <input 
                type="file" 
                name="image" 
                id="fileInput" 
                accept="image/*" 
                onChange={handleChange} 
                className="hidden" 
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate("/admin/activity")}
              className="
                w-full 
                px-6 py-3
                bg-gray-100 text-gray-700
                rounded-lg
                hover:bg-gray-200
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-gray-300
              "
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="
                w-full 
                px-6 py-3
                bg-blue-600 text-white 
                rounded-lg
                hover:bg-blue-700 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              Create Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default AddActivity;