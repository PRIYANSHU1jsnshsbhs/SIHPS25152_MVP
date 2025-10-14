import React, { useState } from "react";
import api from "../api/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      saveAuth(res.data.token, res.data.user);
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div 
        className="w-full max-w-md rounded-2xl shadow-xl p-8"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 153, 51, 0.2)'
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-12 h-12 flex items-center justify-center rounded-full shadow-md"
            style={{
              background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
              color: '#000'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12H8m0 0l4-4m-4 4l4 4"
              />
            </svg>
          </div>
          <div>
            <h2 
              className="text-2xl font-semibold"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#2C3E50'
              }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: '#6C757D' }}>
              Log in to continue to your dashboard.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: '#2C3E50' }}
            >
              Email
            </label>
            <input
              required
              placeholder="you@company.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border text-black focus:outline-none focus:ring-2"
              style={{
                borderColor: 'rgba(255, 153, 51, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF9933';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 153, 51, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 153, 51, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: '#2C3E50' }}
            >
              Password
            </label>
            <input
              required
              placeholder="Your password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border text-black focus:outline-none focus:ring-2"
              style={{
                borderColor: 'rgba(255, 153, 51, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF9933';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 153, 51, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 153, 51, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md disabled:opacity-60 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
              color: '#000',
              fontFamily: 'Poppins, sans-serif'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(255, 153, 51, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 153, 51, 0.3)';
            }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: '#6C757D' }}>
          Don't have an account? <span className="underline" style={{ color: '#FF9933', cursor: 'pointer' }}>Register</span>
        </p>
      </div>
    </div>
  );
}
