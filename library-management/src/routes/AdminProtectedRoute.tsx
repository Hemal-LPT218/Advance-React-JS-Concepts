import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ACCOUNT_TYPE, ROUTES_URL } from "../constants";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

const AdminProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ProtectedRoute>
      {user?.role === ACCOUNT_TYPE.ADMIN ? (
        <AdminDashboardLayout>{children}</AdminDashboardLayout>
      ) : (
        <Navigate to={ROUTES_URL.STUDENT_HOME} />
      )}
    </ProtectedRoute>
  );
};

export default memo(AdminProtectedRoute);
