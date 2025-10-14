import React, { useEffect, useState } from "react";
import api from "../api/api";
import FileUpload from "../components/FileUpload";
import { getCurrentUser } from "../utils/auth";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import SchemeCard from "../components/dashboard/SchemeCard";
import SchemeSkeleton from "../components/dashboard/SchemeSkeleton";

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
  {
    _id: "demo-3",
    name: "Student Scholarship",
    description: "Financial assistance for meritorious students from economically weaker sections.",
    eligibility: "Students with 75%+ marks",
    fee: 0,
  },
  {
    _id: "demo-4",
    name: "Skill Development Program",
    description: "Free vocational training in various trades to enhance employability.",
    eligibility: "Youth aged 18-35",
    fee: 0,
  },
  {
    _id: "demo-5",
    name: "Housing Assistance",
    description: "Subsidized housing loans and grants for first-time homebuyers.",
    eligibility: "Annual income below ₹6 lakhs",
    fee: 0,
  },
  {
    _id: "demo-6",
    name: "Healthcare Support",
    description: "Free medical treatment and insurance coverage for families below poverty line.",
    eligibility: "BPL card holders",
    fee: 0,
  },
  {
    _id: "demo-7",
    name: "Senior Citizen Pension",
    description: "Monthly pension for elderly citizens to ensure financial security.",
    eligibility: "Age 60+ years",
    fee: 0,
  },
  {
    _id: "demo-8",
    name: "MSME Business Loans",
    description: "Low-interest loans for micro, small and medium enterprises.",
    eligibility: "Registered MSMEs",
    fee: 500,
  },
  {
    _id: "demo-9",
    name: "Digital Literacy Program",
    description: "Free computer and internet training for rural communities.",
    eligibility: "Rural residents",
    fee: 0,
  },
  {
    _id: "demo-10",
    name: "Disability Welfare",
    description: "Financial aid and rehabilitation support for persons with disabilities.",
    eligibility: "40%+ disability certificate",
    fee: 0,
  },
  {
    _id: "demo-11",
    name: "Farmer Crop Insurance",
    description: "Comprehensive insurance coverage for crop loss due to natural calamities.",
    eligibility: "All farmers",
    fee: 200,
  },
  {
    _id: "demo-12",
    name: "Child Nutrition Program",
    description: "Nutritional support and meals for children in government schools.",
    eligibility: "Students in grades 1-8",
    fee: 0,
  },
];

export default function UserDashboard() {
  const [schemes, setSchemes] = useState([]);
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // Combine all schemes for display
  const allSchemes = [...schemes, ...sampleExtraSchemes];
  const displayedSchemes = allSchemes.slice(0, visibleCount);
  const hasMore = visibleCount < allSchemes.length;

  useEffect(() => {
    fetchSchemes();
  }, []);

  // Periodically refresh the current user's profile so admin-side approvals show up
  useEffect(() => {
    let mounted = true;
    const refreshUser = async () => {
      try {
        const res = await api.get('/auth/me');
        if (mounted && res.data) {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      } catch (err) {
        // silently ignore
      }
    };
    // initial fetch
    refreshUser();
    const id = setInterval(refreshUser, 10000); // every 10s
    return () => { mounted = false; clearInterval(id); };
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
        <h1 
          className="text-3xl font-bold tracking-tight flex items-center gap-3"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#2C3E50'
          }}
        >
          <span 
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
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
                strokeWidth={1.8}
                d="M3 21h18M4 10.5 12 3l8 7.5M6 21v-8h4v8M14 21v-5h4v5"
              />
            </svg>
          </span>
          User Dashboard
        </h1>
        <p className="text-sm" style={{ color: '#6C757D' }}>
          Manage your details and access government schemes effortlessly.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Upload card */}
        <div className="lg:col-span-1 order-2 lg:order-none space-y-8">
          <section
            aria-labelledby="upload-heading"
            className="rounded-2xl shadow-sm p-6"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 153, 51, 0.2)'
            }}
          >
            <h2
              id="upload-heading"
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: '#2C3E50' }}
            >
              <span 
                className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: 'rgba(255, 153, 51, 0.1)',
                  color: '#FF9933'
                }}
              >
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
            className="rounded-2xl shadow-sm p-6"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 153, 51, 0.2)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2
                id="schemes-heading"
                className="text-lg font-semibold flex items-center gap-2"
                style={{ color: '#2C3E50' }}
              >
                <span 
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                  style={{
                    background: 'rgba(255, 153, 51, 0.1)',
                    color: '#FF9933'
                  }}
                >
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
                <span 
                  className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    color: '#FF9933',
                    background: 'rgba(255, 153, 51, 0.1)',
                    border: '1px solid rgba(255, 153, 51, 0.3)'
                  }}
                >
                  {allSchemes.length}
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchSchemes}
                  disabled={loading}
                  className="text-xs font-medium rounded-md px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255, 153, 51, 0.3)',
                    background: 'rgba(255, 255, 255, 0.5)',
                    color: '#2C3E50'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = 'rgba(255, 153, 51, 0.1)';
                      e.currentTarget.style.borderColor = '#FF9933';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.3)';
                  }}
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>
            {error && (
              <div 
                className="mb-6 text-sm rounded-md px-3 py-2"
                style={{
                  background: 'rgba(224, 17, 95, 0.1)',
                  color: '#E0115F',
                  border: '1px solid rgba(224, 17, 95, 0.3)'
                }}
              >
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
              {!loading && allSchemes.length === 0 && (
                <p className="text-sm col-span-full" style={{ color: '#6C757D' }}>
                  No schemes available right now.
                </p>
              )}
              {displayedSchemes.map((s) => (
                <SchemeCard key={s._id} scheme={s} onApply={handleApply} />
              ))}
            </div>
            
            {/* Show More Button */}
            {hasMore && !loading && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
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
                  Show More Schemes
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
