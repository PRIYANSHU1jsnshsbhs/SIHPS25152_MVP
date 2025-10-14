import React, { useEffect, useState } from "react";
import api from "../api/api";
import FileUpload from "../components/FileUpload";
import { getCurrentUser } from "../utils/auth";

export default function UserDashboard() {
  const [schemes, setSchemes] = useState([]);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await api.get("/user/schemes");
      setSchemes(res.data);
    } catch (err) {
      console.error(err);
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
    <div className="min-h-[70vh] max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">User Dashboard</h2>
          <p className="text-sm text-gray-600">
            Manage your profile, documents and apply for schemes
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold text-black mb-3">Profile</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p className="text-black">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-black">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-black">
              <strong>Verified by AI:</strong> {user?.verified ? "Yes" : "No"}
            </p>
            <p className="text-black">
              <strong>Blockchain Hash:</strong>{" "}
              {user?.blockchainHash || "Not approved by admin yet"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-black mb-3">
              Upload documents & personal details
            </h3>
            <FileUpload
              onUploaded={(u) => {
                setUser(u);
                localStorage.setItem("user", JSON.stringify(u));
              }}
            />
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-black mb-3">
              Available Schemes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.length === 0 && (
                <div className="text-gray-500">
                  No schemes available right now.
                </div>
              )}
              {schemes.map((s) => (
                <div
                  key={s._id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-black font-semibold">{s.name}</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {s.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Eligibility: {s.eligibility}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => handleApply(s._id)}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium"
                      >
                        Apply
                      </button>
                      <div className="text-xs text-gray-400">
                        Fee: {s.fee ? `₹${s.fee}` : "Free"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
