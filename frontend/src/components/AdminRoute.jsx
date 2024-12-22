import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// some pages needs to sign in before proceed
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
