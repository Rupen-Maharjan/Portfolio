import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if token exists in sessionStorage
  const token = sessionStorage.getItem('token');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/authenticate" replace />;
  }

  // If token exists, render children (the protected component)
  return children;
};

export default ProtectedRoute;
