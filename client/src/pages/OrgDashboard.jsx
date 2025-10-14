import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function OrgDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await api.get("/org/applications");
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await api.post(`/org/verify/${id}`, { status });
      alert("Status updated");
      fetchApps();
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  const statusBadge = (status) => {
    if (!status)
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
          Pending
        </span>
      );
    const map = {
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      funded: "bg-indigo-100 text-indigo-800",
    };
    const cls = map[status] || "bg-gray-100 text-gray-800";
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{status}</span>
    );
  };

  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto p-6 space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-black">
          Helping Organization Dashboard
        </h2>
        <p className="text-sm text-gray-600">
          Review applications and update their status
        </p>
      </header>

      <section className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold text-black">Applications</h3>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {apps.length === 0 && (
            <p className="text-sm text-gray-600">No applications yet.</p>
          )}
          {apps.map((a) => (
            <div
              key={a._id}
              className="flex items-start justify-between gap-4 p-4 rounded-lg border hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                    {a.userId?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-semibold text-black">
                      {a.userId?.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({a.userId?.email})
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      Scheme:{" "}
                      <span className="text-black">
                        {a.schemeId?.name || a.schemeId}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Hash: {a.blockchainHash || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div>{statusBadge(a.status)}</div>
                <div className="flex flex-col w-48">
                  <button
                    onClick={() => changeStatus(a._id, "approved")}
                    className="px-3 py-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-500 text-white"
                  >
                    Verify & Approve
                  </button>
                  <button
                    onClick={() => changeStatus(a._id, "rejected")}
                    className="mt-2 px-3 py-2 rounded-md bg-red-500 text-white"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => changeStatus(a._id, "funded")}
                    className="mt-2 px-3 py-2 rounded-md bg-indigo-600 text-white"
                  >
                    Mark Funded
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
