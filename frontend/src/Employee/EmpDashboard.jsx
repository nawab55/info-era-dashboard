import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const EmpDashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="">
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <Sidebar sidebarToggle={sidebarToggle} />
    </div>
  );
};

export default EmpDashboard;
