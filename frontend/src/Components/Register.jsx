import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/api'

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${API_BASE_URL}/api/user/register`; // Replace with your backend URL

    try {
      const response = await axios.post(url, formData);

      if (response.data.success) {
        toast.success("User registered successfully");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Registration failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error during registration request: " + error.message);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-8 text-center mt-6">Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded shadow-md"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 shadow-md"
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 shadow-md"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 shadow-md"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
