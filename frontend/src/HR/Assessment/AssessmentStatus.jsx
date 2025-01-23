import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from "react-icons/ai"; // Icons for status and button
import { HiStatusOnline } from "react-icons/hi";
import api from "../../config/api";

const AssessmentStatus = () => {
  const [status, setStatus] = useState(""); // Dropdown selected value
  const [currentStatus, setCurrentStatus] = useState("Inactive"); // Current status from database
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing status from the backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get("/api/assessment-status/get-status");
        if (response.status === 200 && response.data.success) {
          setCurrentStatus(response.data.data.status || "Inactive"); // Default to Inactive
          setStatus(response.data.data.status || ""); // Sync dropdown value
        } else {
          toast.warn("No status found. Defaulting to Inactive.");
        }
      } catch (error) {
        console.error("Error fetching assessment status:", error);
        toast.error(error.response?.data?.message || "Failed to fetch assessment status.");
      }
    };

    fetchStatus();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please select a valid status.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put("/api/assessment-status/update-status", { status });
      if (response.status === 200 && response.data.success) {
        toast.success("Assessment status updated successfully.");
        setCurrentStatus(status); // Update the current status display
      } else {
        toast.error("Failed to update assessment status.");
      }
    } catch (error) {
      console.error("Error updating assessment status:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Current Status Display */}
      <div className="flex items-center justify-end mb-4">
        <HiStatusOnline className="mr-2 text-xl text-green-600" />
        <span className="text-lg font-semibold text-gray-700">
          Current Status:{" "}
          <span className={`font-bold ${currentStatus === "Active" ? "text-green-600" : "text-red-600"}`}>
            {currentStatus}
          </span>
        </span>
      </div>

      {/* Form Container */}
      <div className="max-w-lg p-6 mx-auto bg-white border border-gray-200 rounded-lg">
        <h1 className="mb-4 text-xl font-bold text-center text-gray-800">
          Update Assessment Status
        </h1>

        {/* Dropdown Input */}
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">
            Select Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Status--</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex items-center justify-center px-6 py-2 text-sm font-medium text-white rounded-md transition ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="mr-2 text-lg text-white animate-spin" />
          ) : (
            <AiOutlineCheckCircle className="mr-2 text-lg text-white" />
          )}
          {isLoading ? "Updating..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AssessmentStatus;
