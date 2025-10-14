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
        shrink ? "py-2 shadow-lg" : "py-3 shadow-xl"
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.95) 0%, rgba(26, 31, 46, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 153, 51, 0.2)'
      }}
    >
      <div
        className={`mx-auto flex items-center gap-6 transition-all duration-300 ${
          shrink ? "max-w-5xl" : "max-w-6xl"
        } px-4`}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div 
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
              boxShadow: '0 4px 6px rgba(255, 153, 51, 0.3)'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 21h18M4 10.5 12 3l8 7.5M6 21v-8h4v8M14 21v-5h4v5"
              />
            </svg>
          </div>
          <span 
            className="font-bold text-lg tracking-tight"
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Welfare System
          </span>
        </Link>

        {/* Desktop nav items */}
        <ul className="hidden md:flex items-center gap-2 ml-4 text-sm">
          {navItems.map((item) => (
            <li key={item.link}>
              <Link
                to={item.link}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  location.pathname === item.link
                    ? ""
                    : ""
                }`}
                style={
                  location.pathname === item.link
                    ? {
                        background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                        color: '#000',
                        boxShadow: '0 2px 4px rgba(255, 153, 51, 0.3)'
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#E8EAED'
                      }
                }
                onMouseEnter={(e) => {
                  if (location.pathname !== item.link) {
                    e.currentTarget.style.background = 'rgba(255, 153, 51, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.link) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
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
                className="px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#E8EAED',
                  border: '1px solid rgba(255, 153, 51, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 153, 51, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-bold rounded-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                  color: '#000',
                  boxShadow: '0 4px 6px rgba(255, 153, 51, 0.3)',
                  fontFamily: 'Poppins, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 10px rgba(255, 153, 51, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 153, 51, 0.3)';
                }}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div className="font-semibold" style={{ color: '#E8EAED' }}>{user.name}</div>
                <div 
                  className="text-xs font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {user.role}
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #E0115F 0%, #DC3545 100%)',
                  color: '#FFF',
                  boxShadow: '0 2px 4px rgba(224, 17, 95, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(224, 17, 95, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(224, 17, 95, 0.3)';
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
                className="gov-btn gov-btn-primary px-4 py-1.5 text-sm"
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
                className="gov-btn gov-btn-danger px-3 py-1.5 text-sm shadow-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden ml-auto p-2 rounded-md bg-white/15 hover:bg-gov-gold-soft hover:text-gov-navy"
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
        <div className="md:hidden border-t border-gov-ash bg-gov-navy/95">
          <ul className="px-4 py-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === item.link ? "bg-gov-gold-soft text-gov-navy" : "hover:bg-gov-gold-soft hover:text-gov-navy"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {!user ? (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md gov-btn-secondary font-medium text-center">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md gov-btn-primary font-medium text-center"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md gov-btn-danger font-medium"
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
