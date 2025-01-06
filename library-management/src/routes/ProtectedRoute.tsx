import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ROUTES_URL } from "../constants";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  
  return user ? children : <Navigate to={ROUTES_URL.LOGIN} />;
};

export default memo(ProtectedRoute);
