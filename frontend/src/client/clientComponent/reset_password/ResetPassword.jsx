import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLock, AiOutlineCheckCircle } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import api from "../../../config/api";

const ResetPassword = () => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    previous: false,
    new: false,
    confirm: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const token = sessionStorage.getItem("customerToken");
      const response = await api.put(
        "/api/customers/update/reset-password",
        { previousPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully.");
        setPreviousPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating password.");
      console.error(error);
    }
  };

  return (
    <section className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-2 rounded mb-6">
        <div className="flex items-center mb-2">
          <RiLockPasswordLine className="text-3xl mr-4" />
          <div>
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-sm text-gray-200">
              Stay secure by updating your password. Enter your details below to proceed.
            </p>
          </div>
        </div>
        <p className="text-gray-200 italic">
        &quot;Your security matters! A strong password is your first line of defense.&quot;
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Previous Password */}
          <div className="mb-6 relative">
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <AiOutlineLock className="mr-2 text-blue-700" />
              Previous Password
            </label>
            <input
              type={showPassword.previous ? "text" : "password"}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
              placeholder="Enter your previous password"
              required
            />
            <div
              className="absolute top-10 right-4 cursor-pointer text-gray-500 hover:text-blue-700"
              onClick={() => togglePasswordVisibility("previous")}
            >
              {showPassword.previous ? (
                <HiOutlineEyeOff size={24} />
              ) : (
                <HiOutlineEye size={24} />
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="mb-6 relative">
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <AiOutlineLock className="mr-2 text-blue-700" />
              New Password
            </label>
            <input
              type={showPassword.new ? "text" : "password"}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
            <div
              className="absolute top-10 right-4 cursor-pointer text-gray-500 hover:text-blue-700"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showPassword.new ? (
                <HiOutlineEyeOff size={24} />
              ) : (
                <HiOutlineEye size={24} />
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <AiOutlineCheckCircle className="mr-2 text-blue-700" />
              Confirm Password
            </label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
            />
            <div
              className="absolute top-10 right-4 cursor-pointer text-gray-500 hover:text-blue-700"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showPassword.confirm ? (
                <HiOutlineEyeOff size={24} />
              ) : (
                <HiOutlineEye size={24} />
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 bg-red-100 px-4 py-2 rounded mb-4 text-center">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-500 text-white py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition focus:ring-4 focus:ring-indigo-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
