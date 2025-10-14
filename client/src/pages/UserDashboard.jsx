import React, { useEffect, useState } from "react";
import api from "../api/api";
import FileUpload from "../components/FileUpload";
import { getCurrentUser } from "../utils/auth";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import SchemeCard from "../components/dashboard/SchemeCard";
import SchemeSkeleton from "../components/dashboard/SchemeSkeleton";

export default function UserDashboard() {
  const [schemes, setSchemes] = useState([]);
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/user/schemes");
      setSchemes(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (schemeId) => {
    try {
      const res = await api.post("/user/apply", { schemeId });
      alert(
        "Applied successfully. Hash: " + res.data.application.blockchainHash
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Apply failed");
    }
  };

  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto p-6 md:p-8 space-y-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600">
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
                strokeWidth={1.8}
                d="M3 21h18M4 10.5 12 3l8 7.5M6 21v-8h4v8M14 21v-5h4v5"
              />
            </svg>
          </span>
          User Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Manage your details and access government schemes effortlessly.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Upload card */}
        <div className="lg:col-span-1 order-2 lg:order-none space-y-8">
          <section
            aria-labelledby="upload-heading"
            className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6"
          >
            <h2
              id="upload-heading"
              className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
              Submit Documents
            </h2>
            <FileUpload
              onUploaded={(u) => {
                setUser(u);
                localStorage.setItem("user", JSON.stringify(u));
              }}
            />
          </section>

        </div>
        <div className="lg:col-span-2 order-1 lg:order-none">
          <ProfileSummary user={user} />
        </div>
        {/* Schemes full-width row */}
        <div className="lg:col-span-3 order-3">
          <section
            aria-labelledby="schemes-heading"
            className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2
                id="schemes-heading"
                className="text-lg font-semibold text-gray-900 flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                </span>
                Available Schemes
                <span className="ml-2 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                  {schemes.length}
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchSchemes}
                  disabled={loading}
                  className="text-xs font-medium rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>
            {error && (
              <div className="mb-6 text-sm rounded-md bg-red-50 text-red-700 border border-red-200 px-3 py-2">
                {error}
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {loading && !schemes.length && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SchemeSkeleton key={i} />
                  ))}
                </>
              )}
              {!loading && schemes.length === 0 && (
                <p className="text-sm text-gray-500 col-span-full">
                  No schemes available right now.
                </p>
              )}
              {[...schemes, ...(!loading ? sampleExtraSchemes : [])].map((s) => (
                <SchemeCard key={s._id} scheme={s} onApply={handleApply} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Additional placeholder schemes for visual fullness (client-side only)
const sampleExtraSchemes = [
  {
    _id: "demo-1",
    name: "Rural Upliftment",
    description: "Support for small farmers adopting sustainable practices.",
    eligibility: "Small / marginal farmers",
    fee: 0,
  },
  {
    _id: "demo-2",
    name: "Women Entrepreneurship",
    description: "Seed funding & mentorship for women-led startups.",
    eligibility: "Women founders",
    fee: 0,
  },
];
