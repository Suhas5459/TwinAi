import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
  // Check if user is logged in (token stored in localStorage)
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // If token exists, render the page
};

