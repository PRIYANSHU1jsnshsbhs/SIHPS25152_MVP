import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function Home() {
  const user = getCurrentUser();

  return (
    <main className="relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-28 md:pb-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1 
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Access Government Welfare Schemes <span>Effortlessly</span>
            </h1>
            <p className="mt-6 text-lg max-w-prose" style={{ color: '#6C757D' }}>
              A unified portal for citizens, organizations, and administrators to manage documents,
              verify identities, and apply for welfare schemes securely.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-bold shadow-lg transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                      color: '#000',
                      fontFamily: 'Poppins, sans-serif',
                      boxShadow: '0 4px 6px rgba(255, 153, 51, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 12px rgba(255, 153, 51, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 153, 51, 0.3)';
                    }}
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold transition-all duration-300"
                    style={{
                      background: 'rgba(255, 153, 51, 0.1)',
                      color: '#2C3E50',
                      border: '1px solid rgba(255, 153, 51, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 153, 51, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 153, 51, 0.1)';
                    }}
                  >
                    Sign In
                  </Link>
                </>
              )}
              {user && (
                <Link
                  to={user.role === 'admin' ? '/admin' : user.role === 'organization' ? '/org' : '/user'}
                  className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-bold shadow-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
                    color: '#000',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            <div 
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
              style={{
                background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)'
              }}
            />
            <div 
              className="relative rounded-2xl shadow-xl p-6 space-y-4"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 153, 51, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <FeatureItem icon="document" title="Unified Documents" desc="Upload once & reuse across multiple schemes." />
              <FeatureItem icon="shield" title="Secure Verification" desc="AI & admin backed identity validation." />
              <FeatureItem icon="bolt" title="Fast Applications" desc="Apply to suitable schemes in a few clicks." />
              <FeatureItem icon="chart" title="Transparent Tracking" desc="Track submission & approval status in real-time." />
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Section */}
      <section 
        className="border-t"
        style={{
          background: 'rgba(255, 153, 51, 0.05)',
          borderColor: 'rgba(255, 153, 51, 0.2)'
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
          <StatCard number="3x" label="Faster onboarding" />
          <StatCard number="99.9%" label="Data availability" />
          <StatCard number="24/7" label="Access anywhere" />
        </div>
      </section>
    </main>
  );
}

function FeatureItem({ icon, title, desc }) {
  const iconMap = {
    document: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M7 3h6l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 1v4h4" />
    ),
    shield: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3 5 6v6c0 5 3.8 7.9 7 9 3.2-1.1 7-4 7-9V6l-7-3z" />
    ),
    bolt: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    ),
    chart: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 20h16M6 16v-6m6 6V4m6 12V8" />
    ),
  };
  return (
    <div className="flex items-start gap-4">
      <span 
        className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(19, 136, 8, 0.1) 100%)',
          color: '#FF9933',
          border: '1px solid rgba(255, 153, 51, 0.3)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
          {iconMap[icon]}
        </svg>
      </span>
      <div>
        <h3 className="font-semibold text-sm" style={{ color: '#2C3E50' }}>{title}</h3>
        <p className="mt-1 text-xs leading-relaxed" style={{ color: '#6C757D' }}>{desc}</p>
      </div>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div 
        className="text-4xl font-bold tracking-tight"
        style={{
          fontFamily: 'Poppins, sans-serif',
          background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {number}
      </div>
      <div className="mt-2 text-sm font-medium" style={{ color: '#6C757D' }}>{label}</div>
    </div>
  );
}
