/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Building2,
  GraduationCap,
  User,
  BookOpen,
  Scroll,
  Calendar,
  Notebook,
  Smartphone,
  MessageCircle,
  Mail,
  Languages,
  Plus,
} from "lucide-react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    course: "",
    studentName: "",
    branch: "",
    registrationNo: "IE-EDU-001", // Default initial format
    yearSession: "",
    rollNo: "",
    semester: "",
    mobileNo: "",
    trainingTopic: "",
    emailId: "",
    language: "",
  });

  const [collegeNames, setCollegeNames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch the latest registration number
  const fetchLatestRegistrationNo = async () => {
    try {
      const response = await api.get("/api/student/latest-registration");
      if (response.data.latest) {
        setFormData((prev) => ({
          ...prev,
          registrationNo: response.data.latest,
        }));
      } else {
        toast.error("Failed to load the latest registration number");
      }
    } catch (error) {
      console.error("Error fetching the latest registration number:", error);
      toast.error("Failed to load the latest registration number");
    }
  };

  // Fetch college names with pagination
  const fetchCollegeNames = async () => {
    try {
      const response = await api.get(`/api/college/get-all-colleges`);
      if (response.data.success) {
        const sortedColleges = response.data.colleges.sort((a, b) =>
          a.collegeName.localeCompare(b.collegeName)
        );
        setCollegeNames(sortedColleges);
      } else {
        toast.error("Failed to load colleges");
      }
    } catch (error) {
      console.error("Error fetching college names:", error);
      toast.error("Failed to load colleges");
    }
  };
  useEffect(() => {
    fetchLatestRegistrationNo();
    fetchCollegeNames();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.collegeName) newErrors.collegeName = "College is required";
    if (!formData.studentName)
      newErrors.studentName = "Student name is required";
    if (!formData.registrationNo)
      newErrors.registrationNo = "Registration number is required";
    if (!formData.emailId) newErrors.emailId = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await api.post("/api/student/create-students", formData);
        toast.success("Student Added Successfully");
        // Fetch the next registration number from the backend
        fetchLatestRegistrationNo();
        // Reset form fields except registration number
        setFormData({
          ...formData,
          collegeName: "",
          course: "",
          studentName: "",
          branch: "",
          yearSession: "",
          rollNo: "",
          semester: "",
          mobileNo: "",
          trainingTopic: "",
          emailId: "",
          language: "",
        });
      } catch (error) {
        console.error("There was an error adding the student:", error);
        toast.error("Failed to add student");
      }
    }
  };

  return (
    <div className="min-h-screen flex-1 lg:py-10 py-4 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded border overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="lg:text-3xl text-xl lg:font-extrabold font-bold text-white text-center">
            Add New Student
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="
          grid grid-cols-1 
          sm:grid-cols-2 
          gap-4 sm:gap-6 
          bg-white 
          shadow-md 
          rounded-lg 
          p-4 sm:p-6 lg:p-8
        "
        >
          {/* College Name Dropdown */}
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="collegeName"
              className="text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <Building2 className="mr-2 text-blue-500" size={20} />
              College Name
            </label>
              <select
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className={`w-full max-h-48 overflow-y-scroll px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.collegeName
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                } transition-all duration-300 ease-in-out`}
              >
                <option value="" disabled >
                  Select College
                </option>
                {collegeNames.length > 0 ? (
                  collegeNames.map((college, index) => (
                    <option key={index} value={college.collegeName} >
                      {college.collegeName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No Colleges Available
                  </option>
                )}
              </select>

            {errors.collegeName && (
              <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>
            )}
          </div> */}

          {/* College Name Dropdown */}
          <div className="sm:col-span-2">
            <label
              htmlFor="collegeName"
              className="text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <Building2 className="mr-2 text-blue-500" size={20} />
              College Name
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                placeholder="Select or Type College"
                value={formData.collegeName}
                onClick={() => setDropdownOpen(true)}
                onChange={(e) => {
                  const input = e.target.value;
                  setFormData((prevState) => ({
                    ...prevState,
                    collegeName: input,
                  }));
                }}
              />
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                  {collegeNames.length > 0 ? (
                    collegeNames
                      .filter((college) =>
                        college.collegeName
                          .toLowerCase()
                          .includes(formData.collegeName.toLowerCase())
                      )
                      .map((college, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              collegeName: college.collegeName,
                            }));
                            setDropdownOpen(false);
                          }}
                        >
                          {college.collegeName}
                        </li>
                      ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      No Colleges Available
                    </li>
                  )}
                </ul>
              )}
            </div>
            {errors.collegeName && (
              <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>
            )}
          </div>

          {/* Input fields grid */}
          <InputField
            icon={GraduationCap}
            name="course"
            label="Course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course"
            errors={errors}
          />
          <InputField
            icon={User}
            name="studentName"
            label="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter student name"
            errors={errors}
          />
          <InputField
            icon={BookOpen}
            name="branch"
            label="Branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Enter branch"
            errors={errors}
          />
          <InputField
            icon={Scroll}
            name="registrationNo"
            label="Registration No"
            value={formData.registrationNo}
            onChange={handleChange}
            placeholder="Enter registration number"
            errors={errors}
            readOnly
          />
          <InputField
            icon={Calendar}
            name="yearSession"
            label="Year/Session"
            value={formData.yearSession}
            onChange={handleChange}
            placeholder="Enter year/session"
            errors={errors}
          />
          <InputField
            icon={Notebook}
            name="rollNo"
            label="Roll No"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Enter roll number"
            errors={errors}
          />
          <InputField
            icon={Notebook}
            name="semester"
            label="Semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="Enter semester"
            errors={errors}
          />
          <InputField
            icon={Smartphone}
            name="mobileNo"
            label="Mobile No"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter mobile number"
            errors={errors}
          />
          <InputField
            icon={MessageCircle}
            name="trainingTopic"
            label="Training Topic"
            value={formData.trainingTopic}
            onChange={handleChange}
            placeholder="Enter training topic"
            errors={errors}
          />
          <InputField
            icon={Mail}
            name="emailId"
            label="Email Id"
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Enter email address"
            errors={errors}
          />
          <div className="sm:col-span-2">
            <InputField
              icon={Languages}
              name="language"
              label="Language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Enter language"
              errors={errors}
            />
          </div>
          <div className="sm:col-span-2 flex justify-end pt-4">
            <button
              type="submit"
              className="
              px-8 sm:px-12 
              py-2 sm:py-3 
              bg-blue-600 text-white 
              rounded-lg font-semibold 
              hover:bg-blue-700 
              transition-colors 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-offset-2
              transform hover:scale-[1.02] 
              active:scale-[0.98]
              duration-300 
              ease-in-out
              flex items-center
            "
            >
              <Plus className="mr-2" size={20} />
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

const InputField = ({
  icon: Icon,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  errors,
  readOnly = false,
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
        readOnly={readOnly}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 absolute">{errors[name]}</p>
      )}
    </div>
  </div>
);
