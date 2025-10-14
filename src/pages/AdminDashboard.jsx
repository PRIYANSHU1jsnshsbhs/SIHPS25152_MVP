import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await api.get("/admin/pending");
      setPending(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async (id) => {
    try {
      await api.post(`/admin/approve/${id}`);
      alert("User approved");
      fetchPending();
    } catch (err) {
      alert(err?.response?.data?.message || "Approve failed");
    }
  };

  const reject = async (id) => {
    try {
      await api.post(`/admin/reject/${id}`);
      alert("User rejected");
      fetchPending();
    } catch (err) {
      alert(err?.response?.data?.message || "Reject failed");
    }
  };

  const seedSchemes = async () => {
    try {
      await api.post("/admin/seed-schemes");
      alert("Dummy schemes added");
    } catch (err) {
      alert("Seed failed");
    }
  };

  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">
            Government Admin Dashboard
          </h2>
          <p className="text-sm text-gray-600">
            Approve users and manage schemes
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={seedSchemes}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium"
          >
            Add Dummy Schemes
          </button>
        </div>
      </header>

      <section className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold text-black">
          Users pending approval
        </h3>
        {pending.length === 0 && (
          <p className="text-sm text-gray-600 mt-2">No pending users</p>
        )}
        <div className="grid grid-cols-1 gap-4 mt-4">
          {pending.map((u) => (
            <div
              key={u._id}
              className="flex items-center justify-between gap-4 p-4 rounded-lg border hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                  {u.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <div className="font-semibold text-black">
                    {u.name}{" "}
                    <span className="text-xs text-gray-500">({u.email})</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    Verified by AI:{" "}
                    <span className="text-black">
                      {u.verified ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Docs: {u.documents?.length || 0}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => approve(u._id)}
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => reject(u._id)}
                  className="px-3 py-2 rounded-md bg-red-500 text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
