import { useEffect, useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import api from "../../config/api";


const HRAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // fetch user details
    const userDetails = async () => {
      try {
        const response = await api.get('/api/user/getuser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setUserName(response.data.user.email);
      } catch (error) {
        console.log("Error fetching user details: ", error);
      }
    };

    userDetails();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`Attendance marked as: ${attendanceStatus}`);

    try {
      const response = await api.post('/api/attendance', {
        status: attendanceStatus
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });

      toast.success("Attendance Marked Successfully");
      console.log('Attendance updated:', response.data);
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  return (
    <section className="bg-blue-gray-50 p-4 mt-16 md:ml-52">
      <div className="flex items-center justify-center h-20 border-b-2 bg-slate-50">
        <h1 className="text-2xl font-bold">Attendance</h1>
      </div>
      <div className="h-96 bg-slate-100 flex flex-col justify-start pl-4">
        <div className="flex w-full mb-4"> {/* Added pl-4 class for left padding */}
          <h2 className="text-xl">
            Your Name: <span className="text-green-700">{userName}</span>
          </h2>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4" style={{ color: '#FF4500' }}>Mark Attendance</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="inline-block mr-4">
                <input
                  type="radio"
                  name="attendance"
                  value="Present"
                  checked={attendanceStatus === "Present"}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="mr-2"
                  style={{ accentColor: '#15803d' }}
                />
                <span className="text-green-700">Present</span>
              </label>
              <label className="inline-block mr-4">
                <input
                  type="radio"
                  name="attendance"
                  value="Absent"
                  checked={attendanceStatus === "Absent"}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="mr-2"
                  style={{ accentColor: '#b91c1c' }}
                />
                <span className="text-red-700">Absent</span>
              </label>
              <label className="inline-block mr-4">
                <input
                  type="radio"
                  name="attendance"
                  value="HalfDay"
                  checked={attendanceStatus === "HalfDay"}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="mr-2"
                  style={{ accentColor: '#f59e0b' }}
                />
                <span className="text-amber-500">HalfDay</span>
              </label>
              <label className="inline-block mr-4">
                <input
                  type="radio"
                  name="attendance"
                  value="Holiday"
                  checked={attendanceStatus === "Holiday"}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="mr-2"
                  style={{ accentColor: '#3b82f6' }}
                />
                <span className="text-blue-500">Holiday</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HRAttendance;
