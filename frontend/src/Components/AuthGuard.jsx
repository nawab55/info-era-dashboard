/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ allowedRoles }) => {
  // Retrieve token and role from sessionStorage
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // If no token, redirect to login
  if (!token) {
    console.log("No token, redirecting to login");
    return <Navigate to="/" />;
  }

  // Check if the user's role is allowed for this route
  if (!allowedRoles.includes(role)) {
    console.log("Access denied, redirecting to dashboard");
    // Redirect the user to their respective dashboard
    const dashboardRoute = getDashboardRoute(role);
    return <Navigate to={dashboardRoute} />;
  }

  // If token and role are valid, render the protected route
  return <Outlet />;
};

// Helper function to get the dashboard route based on the user's role
const getDashboardRoute = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "hr":
      return "/hr";
    case "account":
      return "/account/dashboard";
    case "employee":
      return "/employee";
    case "project-manager":
      return "/project-manager/dashboard";
    default:
      return "/";
  }
};

export default AuthGuard;