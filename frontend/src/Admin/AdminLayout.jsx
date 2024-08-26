import { Outlet, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Breadcrumb from "./Breadcrumb";
// import Sidebar from "./Sidebar";

const AdminLayout = () => {
  //   const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  console.log("Layout rendered, current location:", location.pathname);

  return (
    <>
      <div className=" bg-blue-50 ">
        <AdminDashboard />

        <main className="">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
