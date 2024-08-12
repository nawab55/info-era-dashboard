import { Outlet, useLocation } from "react-router-dom";


import HRDashboard from "./HRDashboard";
// import Sidebar from "./Sidebar";

function Layout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  console.log("Layout rendered, current location:", location.pathname);

  return (
    <div className="">
      <div className="">
        <HRDashboard />
        
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
