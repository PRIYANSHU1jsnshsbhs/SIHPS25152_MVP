import React, { useState } from "react";
import api from "../api/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      saveAuth(res.data.token, res.data.user);
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Register failed");
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z"
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
              Create account
            </h2>
            <p className="text-sm" style={{ color: '#6C757D' }}>
              Join and start applying for help or managing requests.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: '#2C3E50' }}
            >
              Full name
            </label>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              placeholder="Create a password"
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

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: '#2C3E50' }}
            >
              Role
            </label>
            <div className="flex gap-2">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
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
              >
                <option value="user">User</option>
                <option value="admin">Government Admin</option>
                <option value="organization">Helping Organization</option>
              </select>
            </div>
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
                Registering...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: '#6C757D' }}>
          By creating an account you agree to our{" "}
          <span className="underline" style={{ color: '#FF9933', cursor: 'pointer' }}>Terms</span> and{" "}
          <span className="underline" style={{ color: '#FF9933', cursor: 'pointer' }}>Privacy</span>.
        </p>
      </div>
    </div>
  );
}
