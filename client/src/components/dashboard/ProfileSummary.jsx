import React from "react";

/**
 * ProfileSummary card – displays user identity and verification states.
 * Status logic:
 *  - AI verification: user.verified (boolean)
 *  - Admin approval: user.blockchainHash present => approved, else awaiting.
 */
export default function ProfileSummary({ user }) {
  const aiStatus = user?.verified
    ? { label: "AI Verified", tone: "bg-green-50 text-green-700 border-green-200" }
    : { label: "Verification Pending ⚙️", tone: "bg-amber-50 text-amber-700 border-amber-200" };

  const adminStatus = user?.blockchainHash
    ? { label: "Approved", tone: "bg-green-50 text-green-700 border-green-200" }
    : { label: "Awaiting Admin Approval", tone: "bg-gray-100 text-gray-600 border-gray-300" };

  return (
    <section
      aria-labelledby="profile-heading"
      className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h2 id="profile-heading" className="text-lg font-semibold text-gray-900">
            Profile
          </h2>
          <div className="flex flex-col items-end gap-2 text-right">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${aiStatus.tone}`}
            >
              {aiStatus.label}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${adminStatus.tone}`}
            >
              {adminStatus.label}
            </span>
          </div>
        </div>
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium text-gray-900 max-w-[55%] text-right truncate">
              {user?.name || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900 max-w-[55%] text-right truncate">
              {user?.email || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium text-gray-900 capitalize">{user?.role}</dd>
          </div>
          <div className="pt-2 border-t border-gray-100" />
          <div className="space-y-1">
            <dt className="text-gray-500">Blockchain Hash</dt>
            <dd className="font-mono text-[11px] leading-relaxed break-all bg-gray-50 p-2 rounded border border-gray-200">
              {user?.blockchainHash || "—"}
            </dd>
          </div>
        </dl>
        <div className="mt-auto" />
      </div>
      <div className="px-6 py-3 bg-gray-50 text-[11px] text-gray-500 flex items-center justify-between">
        <span>Secure Portal</span>
        {user?.createdAt && (
          <time title={new Date(user.createdAt).toLocaleString()}>
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </time>
        )}
      </div>
    </section>
  );
}
