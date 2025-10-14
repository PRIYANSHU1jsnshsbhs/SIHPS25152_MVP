import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

/**
 * Usage:
 * <Route element={<RequireAuth allowedRoles={['admin']} />}>
 *   <Route path="/admin" element={<AdminDashboard/>} />
 * </Route>
 */
export default function RequireAuth({ allowedRoles = [] }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles.length === 0) return <Outlet />;

  const role = getRole();
  if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;

  return <Outlet />;
}
