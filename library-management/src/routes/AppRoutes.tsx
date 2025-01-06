import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ROUTES_URL } from "../constants";
import RestrictedRoute from "./RestrictedRoute";
import AdminHome from "../pages/AdminHome";
import StudentHome from "../pages/StudentHome";
import AdminProtectedRoute from "./AdminProtectedRoute";
import StudentProtectedRoute from "./StudentProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES_URL.LOGIN}
          element={
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          }
        />
        <Route
          path={ROUTES_URL.REGISTER}
          element={
            <RestrictedRoute>
              <Register />
            </RestrictedRoute>
          }
        />
        <Route
          path={ROUTES_URL.ADMIN_HOME}
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.STUDENT_HOME}
          element={
            <StudentProtectedRoute>
              <StudentHome />
            </StudentProtectedRoute>
          }
        />

        {/* Redirect for non-existent routes */}
        <Route path="*" element={<Navigate to={ROUTES_URL.LOGIN} />} />
      </Routes>
    </Router>
  );
};

export default memo(AppRoutes);
