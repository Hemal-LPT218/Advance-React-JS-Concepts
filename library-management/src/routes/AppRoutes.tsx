import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTES_URL } from "../constants";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookList from "../pages/BookList";
import AdminHome from "../pages/AdminHome";
import StudentHome from "../pages/StudentHome";
import AssignedBookList from "../pages/AssignedBookList";
import StudentProtectedRoute from "./StudentProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import RestrictedRoute from "./RestrictedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Restricted Routes */}
        <Route
          path={ROUTES_URL.HOME}
          element={
            <RestrictedRoute>
              <Home />
            </RestrictedRoute>
          }
        />
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

        {/* Admin Protected Routes */}
        <Route
          path={ROUTES_URL.ADMIN_HOME}
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.BOOK_LIST}
          element={
            <AdminProtectedRoute>
              <BookList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.ASSIGNED_BOOK_LIST}
          element={
            <AdminProtectedRoute>
              <AssignedBookList />
            </AdminProtectedRoute>
          }
        />

        {/* Student Protected Routes */}
        <Route
          path={ROUTES_URL.STUDENT_HOME}
          element={
            <StudentProtectedRoute>
              <StudentHome />
            </StudentProtectedRoute>
          }
        />

        {/* Redirect for non-existent routes */}
        <Route path="*" element={<Navigate to={ROUTES_URL.HOME} />} />
      </Routes>
    </Router>
  );
};

export default memo(AppRoutes);
