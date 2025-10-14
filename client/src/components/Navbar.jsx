import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, clearAuth } from "../utils/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  const dashboardLink = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin";
    if (user.role === "organization") return "/org";
    return "/user";
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                  />
                </svg>
              </div>
              <span className="font-semibold text-lg text-white">Welfare System</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-md hover:bg-white/20 "
                  style={{color: "white"}}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-white text-indigo-700 rounded-md font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs opacity-80">{user.role}</div>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/5 border-t border-white/10">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-md">
              Home
            </Link>
            {user && (
              <Link to={dashboardLink()} className="block px-3 py-2 rounded-md">
                Dashboard
              </Link>
            )}
            {!user ? (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm opacity-80">{user.role}</div>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
