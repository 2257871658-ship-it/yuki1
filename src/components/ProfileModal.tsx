import React from 'react';
import { X, User, Check, ShieldCheck, Home } from 'lucide-react';
import { Roommate } from '../data/mockData';

interface ProfileModalProps {
  roommates: Roommate[];
  activeRoommateId: 'A' | 'B' | 'C';
  onSelectRoommate: (id: 'A' | 'B' | 'C') => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  roommates,
  activeRoommateId,
  onSelectRoommate,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-[#c4c7cb] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#ebeef3] px-4 py-3 border-b border-[#ced4da] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#181c20]" />
            <span className="font-mono-tech text-xs font-bold text-[#181c20] uppercase tracking-wider">
              SWITCH ACTIVE USER
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#545c64] hover:text-[#181c20] rounded"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#545c64] bg-[#f7f9ff] p-2 rounded border border-[#ced4da]">
            <Home className="w-3.5 h-3.5" />
            <span>FLAT: Apartment 4B Main • 380L</span>
          </div>

          <div className="space-y-2">
            {roommates.map((rm) => {
              const isActive = rm.id === activeRoommateId;
              return (
                <button
                  key={rm.id}
                  type="button"
                  onClick={() => {
                    onSelectRoommate(rm.id);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-lg border flex items-center justify-between text-left transition-all ${
                    isActive
                      ? 'bg-[#181c20] text-white border-[#181c20] shadow-sm'
                      : 'bg-white hover:bg-[#ebeef3] text-[#181c20] border-[#c4c7cb]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? 'bg-white text-[#181c20]' : 'bg-[#e0e3e8] text-[#181c20]'
                      }`}
                    >
                      {rm.avatarLetter}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{rm.name}</div>
                      <div
                        className={`text-[10px] font-mono-tech ${
                          isActive ? 'text-[#c4c7cb]' : 'text-[#74777b]'
                        }`}
                      >
                        {rm.code} • {rm.role}
                      </div>
                    </div>
                  </div>

                  {isActive && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
