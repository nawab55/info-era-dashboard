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
    <div className="min-h-screen bg-gradient-to-br flex-1 from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-lg p-6 mb-1">
          <div className="flex items-center space-x-4">
            <RiLockPasswordLine className="text-4xl text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Reset Your Password
              </h1>
              <p className="text-sm text-gray-600">
                Stay secure by updating your password.
              </p>
            </div>
          </div>
          <p className="mt-4 text-indigo-600 italic text-sm">
            &quot;Your security matters! A strong password is your first line of
            defense.&quot;
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-b-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Previous Password */}
            <div className="relative">
              <label className="text-gray-700 font-medium mb-2 flex items-center">
                <AiOutlineLock className="mr-2 text-indigo-600" />
                Previous Password
              </label>
              <div className="relative">
              <input
                type={showPassword.previous ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-300  transition duration-200"
                value={previousPassword}
                onChange={(e) => setPreviousPassword(e.target.value)}
                placeholder="Enter your previous password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition duration-200"
                onClick={() => togglePasswordVisibility("previous")}
              >
                {showPassword.previous ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="text-gray-700 font-medium mb-2 flex items-center">
                <AiOutlineLock className="mr-2 text-indigo-600" />
                New Password
              </label>
             <div className="relative">
             <input
                type={showPassword.new ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-300 transition duration-200"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition duration-200"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
             </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-gray-700 font-medium mb-2 flex items-center">
                <AiOutlineCheckCircle className="mr-2 text-indigo-600" />
                Confirm Password
              </label>
              <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-300  transition duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition duration-200"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 bg-red-100 px-4 py-2 rounded-lg text-center text-sm">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 transition duration-300 focus:ring-4 focus:ring-indigo-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
