import React from 'react';

// Props: score (0-100), size px
export default function ScoreGauge({ score, size = 70 }) {
  if (score == null || isNaN(score)) return <span className="text-xs text-gray-400">—</span>;
  const pct = Math.max(0, Math.min(1, score / 100));
  const circumference = 2 * Math.PI * 32; // r=32
  const dash = circumference * pct;
  const remainder = circumference - dash;

  // Color zones for 0-100 scale
  let color = '#dc2626'; // 0-39 red
  if (score >= 80) color = '#16a34a'; // excellent
  else if (score >= 65) color = '#22c55e'; // good
  else if (score >= 50) color = '#f59e0b'; // fair
  else if (score >= 40) color = '#f97316'; // borderline

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg viewBox="0 0 72 72" width={size} height={size}>
        <circle cx="36" cy="36" r="32" stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx="36"
          cy="36"
          r="32"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${dash} ${remainder}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] leading-tight font-semibold text-gray-900">{score}</span>
        <span className="text-[9px] text-gray-500">AI</span>
      </div>
    </div>
  );
}