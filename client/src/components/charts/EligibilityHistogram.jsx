import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function EligibilityHistogram({ hist }) {
  if (!hist || !hist.buckets || !hist.counts || !Array.isArray(hist.buckets)) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  const data = hist.buckets.map((b,i)=>({ bucket:b, count: hist.counts[i] }));
  
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255, 153, 51, 0.1)" strokeDasharray="2 2" />
        <XAxis dataKey="bucket" tick={{ fill:'#9AA0A6', fontSize:10 }} />
        <YAxis tick={{ fill:'#9AA0A6', fontSize:10 }} width={30} />
        <Tooltip 
          contentStyle={{ 
            background:'rgba(0, 0, 0, 0.9)', 
            border:'1px solid rgba(255, 153, 51, 0.3)', 
            borderRadius: '8px',
            fontSize:12 
          }} 
        />
        <Bar dataKey="count" fill="#138808" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}