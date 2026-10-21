import React from 'react';
import { Thermometer, Droplets, Zap, TrendingUp, CheckCircle } from 'lucide-react';

export const StatsView: React.FC = () => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-mono-tech text-[#181c20] uppercase tracking-wider">
          TELEMETRY & SENSORS
        </h2>
        <span className="text-xs font-mono-tech text-[#545c64] bg-[#ebeef3] px-2 py-0.5 rounded border border-[#ced4da]">
          NODE_ID: SF-089
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-[#c4c7cb] p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#545c64]">
            <span className="font-mono-tech font-bold uppercase">Main Temp</span>
            <Thermometer className="w-4 h-4 text-[#545c64]" />
          </div>
          <div className="text-2xl font-bold text-[#181c20] mt-2 font-mono-tech">
            3.2°C
          </div>
          <span className="text-[10px] text-green-700 font-semibold block mt-1">
            ✓ Optimal Preservation
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#c4c7cb] p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#545c64]">
            <span className="font-mono-tech font-bold uppercase">Humidity</span>
            <Droplets className="w-4 h-4 text-[#545c64]" />
          </div>
          <div className="text-2xl font-bold text-[#181c20] mt-2 font-mono-tech">
            68%
          </div>
          <span className="text-[10px] text-[#545c64] font-medium block mt-1">
            Crisper Regulation Active
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#c4c7cb] p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#545c64]">
            <span className="font-mono-tech font-bold uppercase">Waste Saved</span>
            <TrendingUp className="w-4 h-4 text-[#545c64]" />
          </div>
          <div className="text-2xl font-bold text-[#181c20] mt-2 font-mono-tech">
            94.2%
          </div>
          <span className="text-[10px] text-green-700 font-semibold block mt-1">
            +18% vs Last Month
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#c4c7cb] p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#545c64]">
            <span className="font-mono-tech font-bold uppercase">Eco Class</span>
            <Zap className="w-4 h-4 text-[#545c64]" />
          </div>
          <div className="text-2xl font-bold text-[#181c20] mt-2 font-mono-tech">
            A+++
          </div>
          <span className="text-[10px] text-[#545c64] font-medium block mt-1">
            0.64 kWh / 24h
          </span>
        </div>
      </div>

      {/* Expiration Prevention Log */}
      <div className="bg-white rounded-xl border border-[#c4c7cb] p-4 shadow-sm space-y-2">
        <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20]">
          RECENT INTERVENTIONS
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-[#f7f9ff] rounded-lg border border-[#e0e3e8] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#181c20]">Whole Milk 1L</div>
              <div className="text-[11px] text-[#545c64]">Cooked Béchamel Sauce (-300ml)</div>
            </div>
            <span className="text-[10px] font-mono-tech font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded">
              Saved
            </span>
          </div>

          <div className="p-2.5 bg-[#f7f9ff] rounded-lg border border-[#e0e3e8] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#181c20]">Greek Yogurt</div>
              <div className="text-[11px] text-[#545c64]">Added to morning smoothie bowl</div>
            </div>
            <span className="text-[10px] font-mono-tech font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded">
              Saved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
