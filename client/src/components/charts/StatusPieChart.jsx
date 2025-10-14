import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function StatusPieChart({ data }) {
  if (!data) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  const rows = [
    { name: 'Approved', value: data.approved || 0 },
    { name: 'Pending', value: data.pending || 0 },
    { name: 'Rejected', value: data.rejected || 0 },
  ];
  
  // Indian theme colors: Green (approved), Saffron (pending), Red (rejected)
  const colors = ['#138808', '#FF9933', '#E0115F'];
  
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie data={rows} dataKey="value" innerRadius={40} outerRadius={70} paddingAngle={2}>
          {rows.map((e,i)=><Cell key={i} fill={colors[i]} />)}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            background:'rgba(0, 0, 0, 0.9)', 
            border:'1px solid rgba(255, 153, 51, 0.3)', 
            borderRadius: '8px',
            fontSize:12 
          }} 
        />
        <Legend wrapperStyle={{ fontSize:11, fontFamily: 'Poppins, sans-serif' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}