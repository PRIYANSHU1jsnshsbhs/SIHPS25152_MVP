import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AdminActionsBarChart({ actions }) {
  if (!actions || !Array.isArray(actions) || actions.length === 0) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  const data = actions.map(a => ({ admin: a.admin, approvals: a.approvals, rejections: a.rejections }));
  
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="admin" tick={{ fill:'#9AA0A6', fontSize:10 }} />
        <YAxis tick={{ fill:'#9AA0A6', fontSize:10 }} width={30} />
        <Tooltip 
          contentStyle={{ 
            background:'rgba(0, 0, 0, 0.9)', 
            border:'1px solid rgba(255, 153, 51, 0.3)', 
            borderRadius: '8px',
            fontSize:12 
          }} 
        />
        <Legend wrapperStyle={{ fontSize:11, fontFamily: 'Poppins, sans-serif' }} />
        <Bar dataKey="approvals" stackId="a" fill="#138808" radius={[6,6,0,0]} />
        <Bar dataKey="rejections" stackId="a" fill="#E0115F" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}