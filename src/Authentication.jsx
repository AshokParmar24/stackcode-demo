import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const Authorization = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/" state={{ path: location.pathname }} replace />;
};

export default Authorization;
