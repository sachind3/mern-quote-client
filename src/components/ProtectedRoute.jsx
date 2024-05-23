import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  let location = useLocation();
  const { user } = useSelector((state) => state.user);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
