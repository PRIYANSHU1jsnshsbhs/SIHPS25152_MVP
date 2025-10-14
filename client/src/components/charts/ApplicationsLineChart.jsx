import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ApplicationsLineChart({ series }) {
  if (!series || !series.series || !Array.isArray(series.series) || series.series.length === 0) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={series.series} margin={{ top:10, right:20, left:0, bottom:0 }}>
        <CartesianGrid stroke="rgba(255, 153, 51, 0.1)" strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fill:'#9AA0A6', fontSize:10 }} />
        <YAxis tick={{ fill:'#9AA0A6', fontSize:10 }} width={40} />
        <Tooltip 
          contentStyle={{ 
            background:'rgba(0, 0, 0, 0.9)', 
            border:'1px solid rgba(255, 153, 51, 0.3)', 
            borderRadius: '8px',
            fontSize:12 
          }} 
        />
        <Line type="monotone" dataKey="count" stroke="#FF9933" strokeWidth={3} dot={{ fill: '#FFD700', r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}