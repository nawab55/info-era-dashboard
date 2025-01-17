import { Outlet } from "react-router-dom";
import AccountNavbar from "./AccountNavbar";
import AccountSidebar from "./AccountSidebar";
import { useState } from "react";

function AccountLayout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div>
      <AccountNavbar setSidebarToggle={setSidebarToggle} />
      <main className="flex flex-1 ">
        <AccountSidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <Outlet />
      </main>
    </div>
  );
}

export default AccountLayout;
