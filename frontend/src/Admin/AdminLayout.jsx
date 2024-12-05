import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";
// import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="max-w-full">
      <AdminNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />

      <main className="flex">
        <div className="">
          <AdminSidebar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
        </div>
        <div className="flex-1 max-w-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
