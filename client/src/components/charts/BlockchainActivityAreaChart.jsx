import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line } from 'recharts';

export default function BlockchainActivityAreaChart({ chain }) {
  if (!chain || !Array.isArray(chain) || chain.length === 0) {
    return <div className="text-xs text-[#7A8896]">No data available</div>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={chain} margin={{ top:10, right:20, left:0, bottom:0 }}>
        <defs>
          <linearGradient id="txGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9933" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#FFD700" stopOpacity={0.3} />
          </linearGradient>
        </defs>
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
        <Area type="monotone" dataKey="tx" stroke="#FF9933" fill="url(#txGradient)" />
        <Line type="monotone" dataKey="verifyRate" stroke="#138808" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}