import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function IncomeGroupsBarChart({ groups }) {
  if (!groups || !Array.isArray(groups) || groups.length === 0) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={groups}>
        <CartesianGrid stroke="rgba(255, 153, 51, 0.1)" strokeDasharray="2 2" />
        <XAxis dataKey="label" tick={{ fill:'#9AA0A6', fontSize:10 }} />
        <YAxis tick={{ fill:'#9AA0A6', fontSize:10 }} width={30} />
        <Tooltip 
          contentStyle={{ 
            background:'rgba(0, 0, 0, 0.9)', 
            border:'1px solid rgba(255, 153, 51, 0.3)', 
            borderRadius: '8px',
            fontSize:12 
          }} 
        />
        <Bar dataKey="value" fill="#FF9933" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}