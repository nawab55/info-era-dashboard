import { useEffect, useState } from "react";
import api from "../../../../config/api";
import { toast } from "react-toastify";

const AddStudent = () => {
    const [formData, setFormData] = useState({
        collegeName: "",
        course: "",
        studentName: "",
        branch: "",
        registrationNo: "",
        yearSession: "",
        rollNo: "",
        semester: "",
        mobileNo: "",
        trainingTopic: "",
        emailId: "",
        language: "",
      });
      const [collegeNames, setCollegeNames] = useState([]);
    
      useEffect(() => {
        // Fetch college names when the component is mounted
        const fetchCollegeNames = async () => {
          try {
            const response = await api.get("/api/college/get-colleges");
            console.log(response.data);
    
            // Check if response.data.data is an array before setting the state
            if (Array.isArray(response.data.colleges)) {
              setCollegeNames(response.data.colleges);
            } else {
              console.error("Unexpected response format:", response.data);
            }
          } catch (error) {
            console.error("There was an error fetching the college names:", error);
          }
        };
    
        fetchCollegeNames();
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post("/api/student/create-students", formData);
          toast.success("Student Added in DB Successfully");
          console.log("Student added successfully:", response.data);
          // Handle success (e.g., show a success message, reset form)
        } catch (error) {
          console.error("There was an error adding the student:", error);
        }
      };
    
      return (
        <section className="md:ml-60 bg-inherit p-4 ">
          <div className="max-w-full bg-white p-8 mx-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">
              Add Student
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col">
                <label className="text-gray-700 text-lg mb-2">College Name</label>
                <select
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="px-3 py-3 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700"
                >
                  <option value="" disabled>
                    Select College
                  </option>
                  {collegeNames.length > 0 ? (
                    collegeNames.map((college, index) => (
                      <option key={index} value={college.collegeName}>
                        {college.collegeName}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No Colleges Available
                    </option>
                  )}
                </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Course</label>
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Student Name</label>
            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Branch</label>
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">
              Registration No
            </label>
            <input
              type="text"
              name="registrationNo"
              placeholder="Registration No"
              value={formData.registrationNo}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Year/Session</label>
            <input
              type="text"
              name="yearSession"
              placeholder="Year/Session"
              value={formData.yearSession}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Roll No</label>
            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              value={formData.rollNo}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Semester</label>
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile No"
              value={formData.mobileNo}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Training Topic</label>
            <input
              type="text"
              name="trainingTopic"
              placeholder="Training Topic"
              value={formData.trainingTopic}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Email Id</label>
            <input
              type="email"
              name="emailId"
              placeholder="Email Id"
              value={formData.emailId}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Language</label>
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={formData.language}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="col-span-full flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudent;
