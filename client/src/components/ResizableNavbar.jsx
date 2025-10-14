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
    user && user.role === "admin" ? { name: "Analytics", link: "/admin/analytics" } : null,
    user && user.role === "organization" ? { name: "Organization", link: "/org" } : null,
  ].filter(Boolean);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        shrink ? "py-2 shadow-sm" : "py-3 shadow"
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 153, 51, 0.2)',
        color: '#2C3E50'
      }}
    >
      <div
        className={`mx-auto flex items-center transition-all duration-300 ${
          shrink ? "max-w-5xl" : "max-w-6xl"
        } px-4 relative`}
      >
        <Link to="/" className="flex items-center shrink-0 mr-6">
          <img 
            src="/sahaayya-logo.svg"
            alt="साहाय्य - Welfare System"
            className={`transition-all duration-300 ${shrink ? 'h-10' : 'h-12'}`}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(255, 153, 51, 0.2))',
            }}
          />
        </Link>
        {/* Nav items: centered when logged in, left-aligned next to logo when logged out */}
        <div className={`flex-1 flex ${user ? 'justify-center' : 'justify-start'}`}>
          <ul className={`hidden md:flex items-center gap-5 text-sm ${!user ? 'ml-2' : ''}`}>
          {navItems.map((item) => (
            <li key={item.link}>
              <Link
                to={item.link}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  location.pathname === item.link
                    ? ""
                    : ""
                }`}
                style={
                  location.pathname === item.link
                    ? {
                        background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                        color: '#000',
                        fontWeight: '600'
                      }
                    : {
                        color: '#2C3E50'
                      }
                }
                onMouseEnter={(e) => {
                  if (location.pathname !== item.link) {
                    e.currentTarget.style.background = 'rgba(255, 153, 51, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.link) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm shadow-sm rounded-md transition-all duration-300"
                style={{
                  border: '1px solid rgba(255, 153, 51, 0.3)',
                  color: '#2C3E50'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 153, 51, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm rounded-md transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                  color: '#000',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-xs text-right" style={{ color: '#2C3E50' }}>
                <div className="font-medium">{user.name}</div>
                <div className="opacity-80 capitalize">{user.role}</div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm shadow-sm rounded-md transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--india-saffron) 0%, var(--accent-gold) 100%)',
                  color: '#000',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #E67300 0%, #FFB300 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--india-saffron) 0%, var(--accent-gold) 100%)';
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden ml-auto p-2 rounded-md transition-all duration-300"
          style={{
            background: 'rgba(255, 153, 51, 0.1)',
            color: '#2C3E50'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 153, 51, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 153, 51, 0.1)';
          }}
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
        <div 
          className="md:hidden border-t"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 153, 51, 0.2)'
          }}
        >
          <ul className="px-4 py-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className="block px-3 py-2 rounded-md"
                  style={
                    location.pathname === item.link
                      ? {
                          background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                          color: '#000',
                          fontWeight: '600'
                        }
                      : {
                          color: '#2C3E50'
                        }
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md font-medium text-center"
                  style={{
                    border: '1px solid rgba(255, 153, 51, 0.3)',
                    color: '#2C3E50'
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md font-medium text-center"
                  style={{
                    background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                    color: '#000'
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md font-medium"
                style={{
                  background: 'linear-gradient(135deg, var(--india-saffron) 0%, var(--accent-gold) 100%)',
                  color: '#000',
                  fontWeight: '600'
                }}
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
