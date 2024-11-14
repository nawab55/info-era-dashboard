import { Navigate, Outlet } from "react-router-dom";

const map = new Map();

map.set("account", "/account/dashboard");
map.set("hr", "/hr");
map.set("admin", "/admin/dashboard");
map.set("employee", "/employee");

const AuthLogin = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  // console.log("AuthGuard check, token:", token);
  const url = role ? map.get(role) : "/not-found";

  if (token) {
    console.log("No token, redirecting to login");
    return <Navigate to={url} />;
  }

  // console.log("Token found, rendering Outlet");
  return <Outlet />;
};

export default AuthLogin;
