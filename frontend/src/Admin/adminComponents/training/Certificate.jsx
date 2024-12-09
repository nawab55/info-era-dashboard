/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Calendar,
  Building2,
  User,
  Scroll,
  Languages,
  Smartphone,
  CreditCard,
  FileText,
  // School
} from "lucide-react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const Certificate = () => {
  const [formData, setFormData] = useState({
    year: "",
    collegeName: "",
    regNo: "",
    studentName: "",
    projectName: "",
    language: "",
    fromDate: "",
    toDate: "",
    payment: "",
    mobileNo: "",
    // course:"",
  });

  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.collegeName)
      newErrors.collegeName = "College name is required";
    if (!formData.studentName)
      newErrors.studentName = "Student name is required";
    if (!formData.regNo) newErrors.regNo = "Registration number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "studentName") {
      fetchStudentSuggestions(value); // Fetch student suggestions
    }

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await api.post("/api/certificate/create-certificate", formData);
        toast.success("Certificate data generated successfully");

        // Reset form after successful submission
        setFormData({
          year: "",
          collegeName: "",
          regNo: "",
          studentName: "",
          projectName: "",
          language: "",
          fromDate: "",
          toDate: "",
          payment: "",
          mobileNo: "",
          // course: "",
        });
      } catch (error) {
        console.error("There was an error adding the certificate:", error);
        toast.error("Failed to generate certificate");
      }
    }
  };

  const fetchStudentSuggestions = async (search) => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await api.get(
        `/api/student/get-students?search=${search}`
      );
      if (data.success) {
        setSearchResults(data.students);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleStudentSelect = (student) => {
    setFormData({
      year: student.yearSession,
      collegeName: student.collegeName,
      regNo: student.registrationNo,
      studentName: student.studentName,
      projectName: "",
      language: student.language,
      fromDate: "",
      toDate: "",
      payment: "",
      mobileNo: student.mobileNo,
    });
    setSearchResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen flex-1 py-10 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white border rounded overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold text-white text-center flex items-center justify-center">
            Generate Certificate
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Student Name */}
          <div className="relative">
            <label
              htmlFor="studentName"
              className="text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <User className="mr-2 text-blue-500" size={20} />
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Type student name"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              autoComplete="off"
            />
            {showDropdown && searchResults.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-10 max-h-40 overflow-y-auto">
                {searchResults.map((student) => (
                  <li
                    key={student._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStudentSelect(student)}
                  >
                    {student.studentName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <InputField
            icon={User}
            name="studentName"
            label="Student Name"
            placeholder="Enter student name"
            value={formData.studentName}
            errors={errors}
            onChange={handleChange}
          /> */}
          <InputField
            icon={Building2}
            name="collegeName"
            label="College Name"
            placeholder="Enter college name"
            value={formData.collegeName}
            errors={errors}
            onChange={handleChange}
          />
          <InputField
            icon={Calendar}
            name="year"
            label="Year"
            placeholder="Enter year"
            value={formData.year}
            errors={errors}
            onChange={handleChange}
          />
          <InputField
            icon={Scroll}
            name="regNo"
            label="Registration No"
            placeholder="Enter registration number"
            value={formData.regNo}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            icon={FileText}
            name="projectName"
            label="Project Name"
            placeholder="Enter project name"
            value={formData.projectName}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            icon={Languages}
            name="language"
            label="Language"
            placeholder="Enter language"
            value={formData.language}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            icon={Calendar}
            name="fromDate"
            label="From Date"
            type="date"
            value={formData.fromDate}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            icon={Calendar}
            name="toDate"
            label="To Date"
            type="date"
            value={formData.toDate}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            icon={CreditCard}
            name="payment"
            label="Payment"
            placeholder="Enter payment details"
            value={formData.payment}
            errors={errors}
            onChange={handleChange}
          />

          <InputField
            icon={Smartphone}
            name="mobileNo"
            label="Mobile No"
            placeholder="Enter mobile number"
            type="tel"
            value={formData.mobileNo}
            errors={errors}
            onChange={handleChange}
          />

          {/* <div className="md:col-span-2">
          <InputField 
            icon={School}
            name="course"
            label="Course"
            placeholder="Enter Course Name"
            type="text"
            value={formData.course}
            errors={errors}
            onChange={handleChange}
          />
          </div> */}
          <div className="md:col-span-2 flex justify-end pt-6">
            <button
              type="submit"
              className="
                lg:px-12 px-4 py-3 
                bg-blue-600 text-white 
                rounded-lg font-semibold 
                hover:bg-blue-700 transition-colors 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2
                transform hover:scale-[1.02] active:scale-[0.98]
                duration-300 ease-in-out
              "
            >
              Generate Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Certificate;

const InputField = ({
  icon: Icon,
  name,
  label,
  value,
  onChange,
  errors,
  type = "text",
  placeholder,
}) => (
  <div className="relative mb-4">
    <label
      htmlFor={name}
      className="text-sm font-medium text-gray-700 mb-2 flex items-center"
    >
      {Icon && <Icon className="mr-2 text-blue-500" size={20} />}
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
            w-full px-4 py-2 border rounded 
            outline-none focus:ring-2 
            ${
              errors[name]
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }
            transition-all duration-300 ease-in-out
          `}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 absolute">{errors[name]}</p>
      )}
    </div>
  </div>
);
