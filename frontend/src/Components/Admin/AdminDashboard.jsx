import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="">
      <AdminNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      
      <AdminSidebar sidebarToggle={sidebarToggle} />
    </div>
  );
};

export default AdminDashboard;
