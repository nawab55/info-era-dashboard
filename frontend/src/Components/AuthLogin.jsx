import { Navigate, Outlet } from "react-router-dom";

const map = new Map();

map.set("account", "/account/dashboard");
map.set("hr", "/hr");
map.set("admin", "/admin/dashboard");
map.set("employee", "/employee");
map.set("project-manager", "/project-manager/dashboard"); // Added project manager route

const AuthLogin = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  // console.log("AuthGuard check, token:", token);
  const url = role ? map.get(role) : "/not-found";

  if (token) {
    // console.log("Token found, redirecting to dashboard");
    return <Navigate to={url} />;
  }

  // console.log("Token found, rendering Outlet");
  return <Outlet />;
};

export default AuthLogin;
