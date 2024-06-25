import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const userId = window.localStorage.getItem("userId");

  return userId ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
