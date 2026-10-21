import React from 'react';

export function TechFridgeIcon({ className = 'w-16 h-20' }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`} aria-label="Fridge schematic icon">
      <svg viewBox="0 0 72 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Outer body */}
        <rect x="6" y="6" width="60" height="78" rx="8" fill="#FFFFFF" stroke="#6C757D" strokeWidth="2" />
        
        {/* Freezer door notch */}
        <line x1="6" y1="36" x2="66" y2="36" stroke="#CED4DA" strokeWidth="2" strokeDasharray="2 2" />
        
        {/* Top Freezer indicator bar */}
        <rect x="14" y="14" width="8" height="14" rx="2" fill="#6C757D" />
        <circle cx="36" cy="18" r="2" fill="#6C757D" />
        <circle cx="44" cy="18" r="2" fill="#6C757D" />
        
        {/* Main fridge shelf lines */}
        <rect x="14" y="44" width="44" height="4" rx="2" fill="#E9ECEF" stroke="#CED4DA" strokeWidth="1" />
        <rect x="14" y="58" width="44" height="4" rx="2" fill="#E9ECEF" stroke="#CED4DA" strokeWidth="1" />
        
        {/* Crisper drawer */}
        <rect x="14" y="70" width="12" height="6" rx="2" fill="#E9ECEF" />
        <circle cx="50" cy="73" r="3" fill="#6C757D" />

        {/* Technical crosshair / target top right */}
        <circle cx="58" cy="12" r="4" stroke="#212529" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

export function TechMilkCartonIcon({ className = 'w-10 h-10', volumeText }: { className?: string; volumeText?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Gable top */}
        <path d="M12 12 L20 6 L28 12 L28 16 L12 16 Z" fill="#E9ECEF" stroke="#212529" strokeWidth="1.5" />
        {/* Body */}
        <rect x="10" y="16" width="20" height="26" rx="2" fill="#FFFFFF" stroke="#212529" strokeWidth="1.5" />
        {/* Milk drop emblem */}
        <path d="M20 22 C20 22 17 26 17 28 C17 29.6 18.3 31 20 31 C21.7 31 23 29.6 23 28 C23 26 20 22 20 22 Z" fill="#6C757D" />
        <line x1="14" y1="36" x2="26" y2="36" stroke="#CED4DA" strokeWidth="1.5" />
      </svg>
      {volumeText && (
        <span className="absolute bottom-0 text-[9px] font-mono-tech font-bold text-[#212529] tracking-tighter">
          {volumeText}
        </span>
      )}
    </div>
  );
}

export function ExpiringSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab] tracking-wide">
      {/* SVG containing the Chinese glyphs vector and text */}
      <svg className="w-9 h-3.5 inline-block" viewBox="0 0 36 14" fill="#ba1a1a" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="11" fontSize="11" fontWeight="bold" fontFamily="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif">快过期</text>
      </svg>
      <span>(EXPIRING SOON)</span>
    </span>
  );
}

