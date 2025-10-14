import React from 'react';

export default function TopDistrictsLeaderboard({ chain }) {
  // Mock ranking from blockchain tx counts; real logic would aggregate by region
  if (!chain || !Array.isArray(chain) || chain.length === 0) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  const fallbackDistricts = [
    'New Delhi',
    'Mumbai',
    'Bengaluru',
    'Kolkata',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Ahmedabad'
  ];

  const ranks = chain.slice(0,8).map((d,i) => ({
    district: d.district || d.region || fallbackDistricts[i] || ('District ' + (i+1)),
    value: (typeof d.tx === 'number' ? d.tx : (d.count ?? d.value ?? Math.max(0, 8 + i)))
  }));
  
  return (
    <div className="space-y-2">
      {ranks.map((r,i)=>(
        <div 
          key={i} 
          className="flex items-center justify-between text-xs rounded-lg px-3 py-2 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 153, 51, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="flex items-center gap-2">
            <span 
              className="font-bold text-sm"
              style={{ color: '#2C3E50' }}
            >
              #{i+1}
            </span>
            <span className="text-[#2C3E50]">{r.district}</span>
          </span>
          <span className="font-semibold text-[#138808]">{r.value}</span>
        </div>
      ))}
    </div>
  );
}