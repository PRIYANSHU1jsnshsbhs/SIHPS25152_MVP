import React, { useEffect, useState, useMemo } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    fetchPending();
    fetchUsers();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await api.get("/admin/pending");
      setPending(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const approve = async (id) => {
    try {
      await api.post(`/admin/approve/${id}`);
      alert("User approved");
      // Refresh both lists so table updates
      fetchPending();
      fetchUsers();
    } catch (err) {
      alert(err?.response?.data?.message || "Approve failed");
    }
  };

  const reject = async (id) => {
    try {
      await api.post(`/admin/reject/${id}`);
      alert("User rejected");
      fetchPending();
      fetchUsers();
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

  // Build a unified list (pending first) without duplicates.
  const unified = useMemo(() => {
    const seen = new Set();
    const rows = [];
    pending.forEach(u => {
      if (!seen.has(u._id)) {
        rows.push({ ...u, _pending: true });
        seen.add(u._id);
      }
    });
    users.forEach(u => {
      if (!seen.has(u._id)) {
        rows.push({ ...u, _pending: false });
        seen.add(u._id);
      }
    });
    return rows;
  }, [pending, users]);

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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">Users & Documents</h3>
          <div className="flex gap-2">
            <button onClick={fetchUsers} className="text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50">Refresh</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left font-medium px-3 py-2 border">Name</th>
                <th className="text-left font-medium px-3 py-2 border">Email</th>
                <th className="text-left font-medium px-3 py-2 border">Role</th>
                <th className="text-left font-medium px-3 py-2 border">AI Verified</th>
                <th className="text-left font-medium px-3 py-2 border">Admin Status</th>
                <th className="text-left font-medium px-3 py-2 border">Docs</th>
                <th className="text-left font-medium px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingUsers && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-gray-500">Loading users...</td>
                </tr>
              )}
              {(!loadingUsers && unified.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-gray-500">No users found</td>
                </tr>
              )}
              {unified.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border font-medium text-gray-900">{u.name}</td>
                  <td className="px-3 py-2 border text-gray-700">{u.email}</td>
                  <td className="px-3 py-2 border capitalize">{u.role}</td>
                  <td className="px-3 py-2 border">
                    {u.verified ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs border border-green-200">Yes</span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs border border-amber-200">No</span>
                    )}
                  </td>
                  <td className="px-3 py-2 border">
                    {u.blockchainHash ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs border border-indigo-200">Approved</span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs border border-gray-300">Awaiting</span>
                    )}
                  </td>
                  <td className="px-3 py-2 border">
                    {u.documents?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {u.documents.map((d,i) => (
                          <a key={i} href={docUrl(d)} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-xs">
                            {`Doc ${i+1}`}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-3 py-2 border">
                    {u._pending ? (
                      <div className="flex gap-2">
                        <button onClick={() => approve(u._id)} className="px-2 py-1 rounded-md bg-indigo-600 text-white text-xs">Approve</button>
                        <button onClick={() => reject(u._id)} className="px-2 py-1 rounded-md bg-red-500 text-white text-xs">Reject</button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Normalize stored path (may include backslashes or 'uploads/' prefix) to usable URL
function docUrl(p) {
  if (!p) return '#';
  const norm = p.replace(/\\/g, '/');
  // If already starts with uploads/ keep, else ensure prefix
  const rel = norm.startsWith('uploads/') ? norm : `uploads/${norm.replace(/^\//,'')}`;
  return `http://localhost:8080/${rel}`;
}
