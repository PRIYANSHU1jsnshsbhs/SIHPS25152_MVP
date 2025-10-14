import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ResizableNavbar from "./components/ResizableNavbar";
import RequireAuth from "./components/RequireAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import OrgDashboard from "./pages/OrgDashboard";

export default function App(){
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0F1419 0%, #1A1F2E 100%)',
      color: '#E8EAED'
    }}>
      <ResizableNavbar />
      <Routes>
  <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* User routes */}
        <Route element={<RequireAuth allowedRoles={['user']} />}>
          <Route path="/user" element={<UserDashboard/>} />
        </Route>

        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/analytics" element={<AdminAnalytics/>} />
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

// HomeRedirect no longer needed (we now show landing page)
