import { useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }
    try {
      const token = sessionStorage.getItem("customerToken"); // Get token from session storage
      const response = await api.put(
        "/api/customers/update/reset-password",
        { previousPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );
      if (response.data.success) {
        toast.success("Password updated successfully.");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating password.");
      console.error(error);
    }
  };

  return (
    <section className="md:ml-60 bg-inherit p-4">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 mb-20">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Previous Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="text-rose-500 mb-4">{message}</p>}
          <button
            type="submit"
            className="w-full bg-custom-blue text-white py-2 px-4 rounded hover:bg-custom-hover-blue"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
