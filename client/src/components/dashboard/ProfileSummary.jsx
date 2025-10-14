import React from "react";

/**
 * ProfileSummary card – displays user identity and verification states.
 * Status logic:
 *  - AI verification: user.verified (boolean)
 *  - Admin approval: user.blockchainHash present => approved, else awaiting.
 */
export default function ProfileSummary({ user }) {
  const aiStatus = user?.verified
    ? { label: "AI Verified", bg: 'rgba(19, 136, 8, 0.1)', color: '#138808', border: 'rgba(19, 136, 8, 0.3)' }
    : { label: "Verification Pending ⚙️", bg: 'rgba(255, 153, 51, 0.1)', color: '#FF9933', border: 'rgba(255, 153, 51, 0.3)' };

  const adminStatus = user?.blockchainHash
    ? { label: "Approved", bg: 'rgba(19, 136, 8, 0.1)', color: '#138808', border: 'rgba(19, 136, 8, 0.3)' }
    : { label: "Awaiting Admin Approval", bg: 'rgba(108, 117, 125, 0.1)', color: '#6C757D', border: 'rgba(108, 117, 125, 0.3)' };

  return (
    <section
      aria-labelledby="profile-heading"
      className="rounded-2xl shadow-sm overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 153, 51, 0.2)'
      }}
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h2 
            id="profile-heading" 
            className="text-lg font-semibold"
            style={{ color: '#2C3E50' }}
          >
            Profile
          </h2>
          <div className="flex flex-col items-end gap-2 text-right">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium"
              style={{
                background: aiStatus.bg,
                color: aiStatus.color,
                borderColor: aiStatus.border
              }}
            >
              {aiStatus.label}
            </span>
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium"
              style={{
                background: adminStatus.bg,
                color: adminStatus.color,
                borderColor: adminStatus.border
              }}
            >
              {adminStatus.label}
            </span>
          </div>
        </div>
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt style={{ color: '#6C757D' }}>Name</dt>
            <dd className="font-medium max-w-[55%] text-right truncate" style={{ color: '#2C3E50' }}>
              {user?.name || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt style={{ color: '#6C757D' }}>Email</dt>
            <dd className="font-medium max-w-[55%] text-right truncate" style={{ color: '#2C3E50' }}>
              {user?.email || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt style={{ color: '#6C757D' }}>Role</dt>
            <dd className="font-medium capitalize" style={{ color: '#2C3E50' }}>{user?.role}</dd>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: 'rgba(255, 153, 51, 0.2)' }} />
          <div className="space-y-1">
            <dt style={{ color: '#6C757D' }}>Blockchain Hash</dt>
            <dd 
              className="font-mono text-[11px] leading-relaxed break-all p-2 rounded border"
              style={{
                background: 'rgba(255, 153, 51, 0.05)',
                borderColor: 'rgba(255, 153, 51, 0.2)',
                color: '#2C3E50'
              }}
            >
              {user?.blockchainHash || "—"}
            </dd>
          </div>
        </dl>
        <div className="mt-auto" />
      </div>
      <div 
        className="px-6 py-3 text-[11px] flex items-center justify-between"
        style={{
          background: 'rgba(255, 153, 51, 0.05)',
          color: '#6C757D'
        }}
      >
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
