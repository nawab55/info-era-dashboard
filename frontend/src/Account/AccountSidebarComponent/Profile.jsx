import { useEffect, useState } from "react";
import api from "../../config/api";
import ProfileDetails from "../../Components/Profile/ProfileDetails";

const Profile = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
      // const decoded = JSON.parse(atob(token.split(".")[1]));
      // const userId = decoded.user.userId;
      const userId = sessionStorage.getItem("userId")
      const response = await api.get(`/api/user/details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    handleProfile();   
  }, []);
  
  
  return (
    <section className="md:ml-48 bg-blue-50 p-3 mt-2">
          {/* <div className="bg-blue-100 p-4 shadow-lg text-center">Profile</div> */}
      {employeeDetails ? (
        <ProfileDetails employee={employeeDetails} />
      ) : (
        <div>
          <p>Profile Details not Getting..</p>
        </div>
      )}
    </section>
  )
};

export default Profile