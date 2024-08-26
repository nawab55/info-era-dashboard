import { useState } from "react";
import HRNavbar from "./HRNavbar";
import HRSidebar from "./HRSidebar";

const HRDashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="">
      <HRNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <HRSidebar sidebarToggle={sidebarToggle} />
    </div>
  );
};

export default HRDashboard;
