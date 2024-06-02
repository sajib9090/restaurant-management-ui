/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { currentUser } from "../redux/features/auth/authSlice";

const NonAuthenticatedRoute = ({ children }) => {
  const user = useSelector(currentUser);
  const location = useLocation();
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  useEffect(() => {
    let timeoutId;

    if (user) {
      timeoutId = setTimeout(() => {
        setShouldNavigate(true);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user]);

  if (shouldNavigate) {
    return <Navigate to="/user" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default NonAuthenticatedRoute;
