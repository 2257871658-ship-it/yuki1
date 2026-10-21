import React from 'react';
import { Users, Award, Shield, CheckCircle2 } from 'lucide-react';
import { Roommate } from '../data/mockData';

interface RoommatesViewProps {
  roommates: Roommate[];
}

export const RoommatesView: React.FC<RoommatesViewProps> = ({ roommates }) => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-mono-tech text-[#181c20] uppercase tracking-wider">
          HOUSEHOLD ALLOCATIONS
        </h2>
        <span className="text-xs font-mono-tech text-[#545c64] bg-[#ebeef3] px-2 py-0.5 rounded border border-[#ced4da]">
          FLAT #4B
        </span>
      </div>

      <p className="text-xs text-[#545c64] leading-relaxed">
        Compartments and shelves partitioned according to the digital twin agreement. Items marked shared are eligible for mutual consumption.
      </p>

      <div className="space-y-3">
        {roommates.map((rm) => (
          <div key={rm.id} className="bg-white rounded-xl border border-[#c4c7cb] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#181c20] text-white flex items-center justify-center font-bold text-sm">
                  {rm.avatarLetter}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#181c20]">{rm.name}</h3>
                  <p className="text-[11px] font-mono-tech text-[#545c64]">
                    {rm.code} • {rm.role}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-[#181c20]">{rm.sharedContributionScore}%</div>
                <div className="text-[9px] font-mono-tech text-[#74777b]">ECO SCORE</div>
              </div>
            </div>

            <div className="bg-[#f7f9ff] rounded-lg p-2.5 border border-[#e0e3e8] text-xs">
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#74777b] block mb-1">
                ASSIGNED SECTIONS:
              </span>
              <ul className="space-y-1">
                {rm.assignedShelves.map((shelf, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-[#181c20] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#545c64]" />
                    <span>{shelf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
