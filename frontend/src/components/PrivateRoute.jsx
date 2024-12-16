import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// some pages needs to sign in before proceed
const PrivateRoute = () => {
  const {userInfo} = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
