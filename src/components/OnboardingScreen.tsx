import React, { useState } from 'react';
import { TechFridgeIcon } from './TechnicalIcons';
import { Key, Clipboard, Check, Users, Refrigerator } from 'lucide-react';

interface OnboardingScreenProps {
  onContinue: (householdCode: string, mode: 'create' | 'join') => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onContinue }) => {
  const [selectedMode, setSelectedMode] = useState<'create' | 'join'>('join');
  const [invitationCode, setInvitationCode] = useState('FRIDGE-2026');
  const [newFridgeName, setNewFridgeName] = useState('Apartment 4B Main');
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInvitationCode(text.trim().toUpperCase());
        }
      }
    } catch {
      setInvitationCode('FRIDGE-2026');
    }
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(selectedMode === 'join' ? invitationCode : newFridgeName, selectedMode);
  };

  return (
    <div className="min-h-screen max-h-screen bg-[#f7f9ff] flex flex-col justify-between p-3 sm:p-5 font-sans overflow-hidden">
      {/* Top Technical Header matching Image 1 */}
      <header className="flex items-center justify-between text-xs font-mono-tech tracking-wider text-[#44474a] pb-2 border-b border-[#e0e3e8] shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#545c64]" />
          <span className="font-semibold uppercase tracking-wider text-[#44474a]">
            SYS.INIT // ONBOARD_V0.9
          </span>
        </div>
        <div className="border border-[#74777b] px-2 py-0.5 rounded text-[11px] font-semibold text-[#181c20] bg-white">
          FLOW: TARGET_ENTRY
        </div>
      </header>

      {/* Main Blueprint Box */}
      <main className="flex-1 flex items-center justify-center py-2 px-1">
        <div className="w-full max-w-[390px] bg-white rounded-xl border border-[#c4c7cb] shadow-[0_4px_24px_rgba(24,28,32,0.06)] relative overflow-hidden blueprint-grid p-5 sm:p-6 my-auto">
          
          {/* Subtle Top Schematics Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#212529]" />

          {/* Technical Fridge Schematic Graphic matching Image 1 */}
          <div className="flex justify-center mb-3">
            <TechFridgeIcon className="w-16 h-20" />
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold text-[#181c20] tracking-tight">
              FridgeTwin
            </h1>
            <p className="text-xs text-[#545c64] mt-0.5 font-medium">
              Shared Fridge Digital Twin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Mode 1: Create New Fridge */}
            <button
              type="button"
              onClick={() => setSelectedMode('create')}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                selectedMode === 'create'
                  ? 'bg-[#ebeef3] border-[#212529] shadow-sm'
                  : 'bg-[#f1f4f9] border-[#c4c7cb] hover:bg-[#e5e8ee]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Refrigerator className="w-4 h-4 text-[#545c64]" />
                <span className="font-bold text-sm text-[#181c20]">
                  Create New Fridge
                </span>
              </div>
              <div className="w-4 h-4 rounded-full border border-[#74777b] flex items-center justify-center bg-[#dde3e9]">
                {selectedMode === 'create' && (
                  <div className="w-2 h-2 rounded-full bg-[#212529]" />
                )}
              </div>
            </button>

            {/* Mode 2: Join Roommate's Fridge */}
            <button
              type="button"
              onClick={() => setSelectedMode('join')}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                selectedMode === 'join'
                  ? 'bg-[#ebeef3] border-[#212529] shadow-sm'
                  : 'bg-[#f1f4f9] border-[#c4c7cb] hover:bg-[#e5e8ee]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#545c64]" />
                <span className="font-bold text-sm text-[#181c20]">
                  Join Roommate's Fridge
                </span>
              </div>
              <div className="w-4 h-4 rounded-full border border-[#74777b] flex items-center justify-center bg-white">
                {selectedMode === 'join' && (
                  <div className="w-2 h-2 rounded-full bg-[#212529]" />
                )}
              </div>
            </button>

            {/* Input Section */}
            {selectedMode === 'join' ? (
              <div className="pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono-tech mb-1">
                  <label htmlFor="invite-code-input" className="font-bold uppercase text-[#181c20] tracking-wider">
                    INVITATION CODE
                  </label>
                  <span className="text-[10px] bg-[#ebeef3] border border-[#c4c7cb] px-2 py-0.5 rounded text-[#545c64] font-semibold tracking-wide">
                    REQ: 10-CHAR CODE
                  </span>
                </div>

                <div className="relative flex items-center bg-white rounded-md border border-[#74777b] focus-within:border-[#212529] focus-within:ring-1 focus-within:ring-[#212529] transition-all">
                  <div className="pl-3 pr-2 text-[#545c64]">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    id="invite-code-input"
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                    className="w-full py-2 text-sm font-mono-tech font-bold text-[#181c20] tracking-wider bg-transparent outline-none uppercase"
                    placeholder="FRIDGE-2026"
                    required
                  />
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="mr-1.5 px-2 py-1 text-xs font-mono-tech font-bold bg-[#e0e3e8] hover:bg-[#d7dadf] text-[#181c20] rounded border border-[#c4c7cb] flex items-center gap-1 transition-colors"
                  >
                    {copiedFeedback ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-700" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        <span>Paste</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-[#545c64] mt-1.5 leading-tight">
                  Ask your household admin or check your flat's shared note.
                </p>
              </div>
            ) : (
              <div className="pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono-tech mb-1">
                  <label htmlFor="fridge-name-input" className="font-bold uppercase text-[#181c20] tracking-wider">
                    FRIDGE IDENTIFIER
                  </label>
                  <span className="text-[10px] bg-[#ebeef3] border border-[#c4c7cb] px-2 py-0.5 rounded text-[#545c64] font-medium">
                    SETUP NEW
                  </span>
                </div>
                <input
                  id="fridge-name-input"
                  type="text"
                  value={newFridgeName}
                  onChange={(e) => setNewFridgeName(e.target.value)}
                  className="w-full py-2 px-3 text-sm font-semibold border border-[#74777b] rounded-md focus:border-[#212529] focus:outline-none bg-white"
                  placeholder="e.g. Apartment 4B Main"
                  required
                />
                <p className="text-[11px] text-[#545c64] mt-1.5 leading-tight">
                  Generates a new shared digital twin schema with 4 default compartments.
                </p>
              </div>
            )}

            {/* Primary Action Button matching Image 1: [ ENTRY_POINT ]  Continue ◉ */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#181c20] hover:bg-[#2d3135] active:scale-[0.99] text-white py-3 px-4 rounded-lg flex items-center justify-between font-medium text-sm tracking-wide shadow-sm transition-all"
              >
                <span className="text-[11px] font-mono-tech text-[#c4c7cb] uppercase tracking-wider">
                  [ ENTRY_POINT ]
                </span>
                <span className="font-bold text-white text-base">
                  Continue
                </span>
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </button>
            </div>

            {/* Existing account link */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => onContinue('FRIDGE-2026', 'join')}
                className="text-xs text-[#44474a] hover:text-[#181c20] font-medium transition-colors"
              >
                Existing account? <span className="underline font-bold text-[#181c20]">Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Technical Footer matching Image 1 */}
      <footer className="flex items-center justify-between text-[11px] font-mono-tech text-[#545c64] pt-2 border-t border-[#e0e3e8] shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#74777b]" />
          <span>NODE_ID: SF-089</span>
        </div>
        <div className="flex items-center gap-3">
          <span>LATENCY: 12ms</span>
          <span className="font-bold text-[#181c20]">SYS: ONLINE</span>
        </div>
      </footer>
    </div>
  );
};
