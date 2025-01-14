import { Outlet } from "react-router-dom";
import HRNavbar from "./HRNavbar";
import { useState } from "react";
import HRSidebar from "./HRSidebar";

function Layout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="max-w-full">
      <HRNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <main className="flex ">
        <div>
          <HRSidebar
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
}

export default Layout;

{
  /* <div className="max-w-full">
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
    </div> */
}
