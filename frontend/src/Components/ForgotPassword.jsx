import { useState } from "react";
import api from "../config/api";
import { toast } from "react-toastify";
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("api/user/forgot-password", { email });
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      toast(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-center bg-contain lg:flex-row bg-gradient-to-r from-sky-200 via-slate-200 to-blue-200 lg:px-0 lg:gap-16"
      // style={{
      //   backgroundImage: `url('/forgotbg-image.webp')`,
      // }}
    >
      {/* Image Section */}
      <div className="lg:w-[35%] mb-8 lg:mb-0 bg-inherit">
        <img
          src="/forgot-password.png"
          alt="Forgot Password Illustration"
          className="w-full max-w-md mx-auto rounded-lg lg:max-w-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md p-8 bg-white border rounded-lg shadow-lg lg:w-1/2">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="mb-6 text-justify text-gray-600">
          Enter your email address below and we will send you a link to reset
          your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <FiMail
              className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 left-3"
              size={20}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-2 pl-10 pr-4 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-md ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
