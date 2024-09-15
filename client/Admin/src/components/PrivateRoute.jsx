import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check authentication status (e.g., using localStorage)
  const isAuthenticated = !!localStorage.getItem('userName');

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
