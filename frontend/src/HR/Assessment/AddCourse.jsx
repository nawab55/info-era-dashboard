import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi'; // Delete icon
import { AiOutlinePlus } from 'react-icons/ai'; // Add icon
import api from '../../config/api'; // Axios instance with baseURL

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [backgroundType, setBackgroundType] = useState('');
  const [coursesList, setCoursesList] = useState([]);
  const token = sessionStorage.getItem('token'); // Get token from session storage

  // Fetch existing courses
  const fetchCourses = async () => {
    try {
      const response = await api.get('/api/assessment/course', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoursesList(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching courses');
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle add course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (courseName.trim() && backgroundType) {
      try {
        await api.post(
          '/api/assessment/course/add',
          { name: courseName, background: backgroundType },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Course added successfully');
        setCourseName(''); // Clear input fields
        setBackgroundType('');
        fetchCourses(); // Fetch updated list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error adding course');
      }
    } else {
      toast.error('Both fields are required');
    }
  };

  // Handle delete course
  const handleDeleteCourse = async (id) => {
    try {
      await api.delete(`/api/assessment/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Course deleted successfully');
      fetchCourses(); // Fetch updated list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting course');
    }
  };

  return (
    <div className="flex-1 min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl p-6 mx-auto bg-white border rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Add Course</h2>

        <form onSubmit={handleAddCourse} className="flex flex-col gap-4">
          <label htmlFor="courseNameInput" className="text-sm text-gray-600">
            Course Name
          </label>
          <input
            id="courseNameInput"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter course name..."
          />

          <label htmlFor="backgroundTypeSelect" className="text-sm text-gray-600">
            Background Type
          </label>
          <select
            id="backgroundTypeSelect"
            value={backgroundType}
            onChange={(e) => setBackgroundType(e.target.value)}
            className="p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select background type...</option>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <AiOutlinePlus size={18} /> Add Course
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Added Courses</h3>
          <ul className="mt-4 space-y-2">
            {coursesList.map((course) => (
              <li
                key={course._id} // Unique key from the backend
                className="flex items-center justify-between p-4 rounded-lg shadow bg-gray-50 hover:bg-gray-100"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">{course.name}</p>
                  <p className="text-xs text-gray-500">{course.background}</p>
                </div>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <FiTrash2 size={18} /> Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
