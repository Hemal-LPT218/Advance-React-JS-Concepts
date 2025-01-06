import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ACCOUNT_TYPE, ROUTES_URL } from "../constants";
import ProtectedRoute from "./ProtectedRoute";

const StudentProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  
  return (
    <ProtectedRoute>
      {user?.role === ACCOUNT_TYPE.STUDENT ? (
        children
      ) : (
        <Navigate to={ROUTES_URL.ADMIN_HOME} />
      )}
    </ProtectedRoute>
  );
};

export default memo(StudentProtectedRoute);
