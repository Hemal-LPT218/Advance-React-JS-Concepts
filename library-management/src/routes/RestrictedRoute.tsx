import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE, ROUTES_URL } from "../constants";
import UnAuthLayout from "../layouts/UnAuthLayout";
import { RootState } from "../store/store";

const RestrictedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);

  return user ? (
    <Navigate
      to={
        user.role === ACCOUNT_TYPE.ADMIN
          ? ROUTES_URL.ADMIN_HOME
          : ROUTES_URL.STUDENT_HOME
      }
    />
  ) : (
    <UnAuthLayout>{children}</UnAuthLayout>
  );
};

export default memo(RestrictedRoute);
