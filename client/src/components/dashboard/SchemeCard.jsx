import React from "react";

export default function SchemeCard({ scheme, onApply }) {
  return (
    <article
      className="group relative flex flex-col rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
      aria-labelledby={`scheme-${scheme._id}`}
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 153, 51, 0.2)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.4)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="p-5 flex-1 flex flex-col">
        <h3
          id={`scheme-${scheme._id}`}
          className="text-base font-semibold transition"
          style={{ color: '#2C3E50' }}
        >
          {scheme.name}
        </h3>
        <p className="mt-2 text-sm line-clamp-3 leading-relaxed" style={{ color: '#6C757D' }}>
          {scheme.description}
        </p>
        <p className="mt-3 text-xs font-medium" style={{ color: '#6C757D' }}>
          Eligibility: <span className="font-normal">{scheme.eligibility}</span>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onApply(scheme._id)}
            className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-xs font-medium shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
              color: '#000',
              fontFamily: 'Poppins, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 153, 51, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            Apply
          </button>
          <span 
            className="text-[10px] font-medium px-2 py-1 rounded-full border"
            style={{
              color: '#FF9933',
              background: 'rgba(255, 153, 51, 0.1)',
              borderColor: 'rgba(255, 153, 51, 0.3)'
            }}
          >
            {scheme.fee ? `₹${scheme.fee}` : "Free"}
          </span>
        </div>
      </div>
    </article>
  );
}
