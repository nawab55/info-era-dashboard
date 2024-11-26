import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import { useState } from "react";
import ClientSidebar from "./ClientSidebar";
// import Breadcrumb from "../Components/breadcrumb/BreadCrumb";

const ClientLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <>
      <div className="">
      <ClientNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />

        <div className="flex min-w-full">
          <ClientSidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
          {/* <Breadcrumb /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ClientLayout;







