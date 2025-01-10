import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password visibility toggle

import api from '../config/api';

const UpdatePassword = () => {
  const { userId, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await api.post(`api/user/reset-password/${userId}/${token}`, { password, confirmPassword });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate('/'); // Redirect to login page after successful password reset
      } else {
        toast.error(response.data.message);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-r from-fuchsia-200 via-violet-200 to-slate-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div className="relative mb-6">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">New Password</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute text-gray-500 cursor-pointer right-3 top-12"
            >
              {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700">Confirm Password</label>
            <input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              className="absolute text-gray-500 cursor-pointer right-3 top-12"
            >
              {isConfirmPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
