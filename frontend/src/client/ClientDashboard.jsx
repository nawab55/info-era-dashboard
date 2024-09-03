import { useState } from "react";
import ClientNavbar from "./ClientNavbar";
import ClientSidebar from "./ClientSidebar";

const ClientDashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="">
      <ClientNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />

      <ClientSidebar sidebarToggle={sidebarToggle} />
    </div>
  );
};

export default ClientDashboard;
