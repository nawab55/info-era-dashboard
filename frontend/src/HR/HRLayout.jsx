import { Outlet } from "react-router-dom";
import HRNavbar from "./HRNavbar";
import { useState } from "react";
import HRSidebar from "./HRSidebar";

function Layout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="">
      <HRNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className="flex min-w-full">
        <HRSidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
