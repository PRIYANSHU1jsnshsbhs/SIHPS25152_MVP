import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrgDashboard from "./pages/OrgDashboard";

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* User routes */}
        <Route element={<RequireAuth allowedRoles={['user']} />}>
          <Route path="/user" element={<UserDashboard/>} />
        </Route>

        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard/>} />
        </Route>

        {/* Organization routes */}
        <Route element={<RequireAuth allowedRoles={['organization']} />}>
          <Route path="/org" element={<OrgDashboard/>} />
        </Route>

        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </div>
  );
}

function HomeRedirect(){
  // choose redirect by role
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "organization") return <Navigate to="/org" replace />;
  return <Navigate to="/user" replace />;
}
