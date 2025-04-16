import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoutes = () => {
  const location = useLocation();
  const isLogin = localStorage.getItem("token");
  

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
