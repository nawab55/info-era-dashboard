import { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import AccountNavbar from "./AccountNavbar";

const AccountDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AccountNavbar
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <AccountSidebar sidebarOpen={sidebarOpen} />
    </>
  );
};

export default AccountDashboard;
