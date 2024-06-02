/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { currentUserToken, logout } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();

  const token = useSelector(currentUserToken);
  let user;
  if (token) {
    user = jwtDecode(token);
  }

  const dispatch = useDispatch();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== undefined && role !== user?.role) {
    toast.error("You are not permitted");
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
