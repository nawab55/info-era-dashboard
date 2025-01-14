const Course = require('../../models/assessmentTest_model/course.model');

// Add a new course
const addCourse = async (req, res) => {
  try {
    const { name, background } = req.body;

    if (!name || !background) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const course = await Course.create({ name, background });

    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
      const courses = await Course.find().sort({ createdAt: -1 }); // Sort by latest
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
      const course = await Course.findByIdAndDelete(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// get course data using the courses name
const getCourseByName = async (req, res) => {
  try {
    const { courseName  } = req.params;
    // console.log(courseName);

    const course = await Course.findOne({ name : courseName });
    // console.log(course);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ course, success: true, message: 'Course successfully found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCourses, 
  addCourse, 
  deleteCourse, 
  getCourseByName 
};
