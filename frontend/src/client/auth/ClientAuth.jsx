import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import

const ClientAuth = () => {
  const token = sessionStorage.getItem('customerToken');

  // If no token, redirect to login
  if (!token) {
    console.log("No token, redirecting to login");
    return <Navigate to="/client_login" />;
  }

  try {
    // Decode the token to check expiration
    const decodedToken = jwtDecode(token);

    // Check if the token has expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      console.log("Token expired, redirecting to login");
      sessionStorage.removeItem('customerToken'); // Clear expired token
      sessionStorage.removeItem('clientId'); // Clear client ID
      return <Navigate to="/client_login" />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/client_login" />;
  }

  return <Outlet />;
};

export default ClientAuth;
