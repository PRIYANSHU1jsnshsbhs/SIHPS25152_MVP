import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, clearAuth } from "../utils/auth";

/**
 * Simplified resizable navbar inspired by Aceternity UI concept.
 * Shrinks width & height after user scrolls down a threshold.
 * Provides expandable menu on mobile.
 */
export default function ResizableNavbar() {
  const [shrink, setShrink] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // close mobile menu on route change
    setMobileOpen(false);
  }, [location.pathname]);

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", link: "/" },
    user && user.role === "user" ? { name: "Dashboard", link: "/user" } : null,
    user && user.role === "admin" ? { name: "Admin", link: "/admin" } : null,
    user && user.role === "organization" ? { name: "Organization", link: "/org" } : null,
  ].filter(Boolean);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md border-b border-indigo-200/40 bg-gradient-to-r from-indigo-600 to-blue-500 text-white ${
        shrink ? "py-2" : "py-3"
      }`}
    >
      <div
        className={`mx-auto flex items-center gap-6 transition-all duration-300 ${
          shrink ? "max-w-5xl" : "max-w-6xl"
        } px-4`}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M3 21h18M4 10.5 12 3l8 7.5M6 21v-8h4v8M14 21v-5h4v5"
              />
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight">Welfare System</span>
        </Link>

        {/* Desktop nav items */}
        <ul className="hidden md:flex items-center gap-4 ml-4 text-sm">
          {navItems.map((item) => (
            <li key={item.link}>
              <Link
                to={item.link}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  location.pathname === item.link
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-white text-indigo-700 hover:bg-indigo-50 shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-indigo-50 text-white ring-1 ring-white/50"
                style={{ background: "linear-gradient(to right,#eef2ff,#e0e7ff)" }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-xs text-white/90 text-right">
                <div className="font-medium">{user.name}</div>
                <div className="opacity-80 capitalize">{user.role}</div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 shadow-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden ml-auto p-2 rounded-md bg-white/20"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {mobileOpen ? (
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-gradient-to-r from-indigo-600 to-blue-500/95">
          <ul className="px-4 py-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === item.link ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {!user ? (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md bg-white text-indigo-700 font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md bg-red-500 text-white font-medium"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
