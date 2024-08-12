
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const token = sessionStorage.getItem('token');
  // console.log("AuthGuard check, token:", token);

  if (!token) {
    console.log("No token, redirecting to login");
    return <Navigate to="/login" />;
  }

  // console.log("Token found, rendering Outlet");
  return <Outlet />;
};

export default AuthGuard;
