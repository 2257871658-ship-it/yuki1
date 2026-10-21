import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, BookOpen, Check, BellOff, Utensils, ArrowRight, Package, Info, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { TechMilkCartonIcon } from './TechnicalIcons';
import { FridgeItem, SuggestedRecipe } from '../utils/fridgeRules';

interface ReminderScreenProps {
  item: FridgeItem;
  onBack: () => void;
  onMarkUsed: (itemId: string) => void;
  onDeductInventory: (itemId: string, amountMl: number) => void;
  onSelectRecipe: (recipe: SuggestedRecipe) => void;
}

export const ReminderScreen: React.FC<ReminderScreenProps> = ({
  item,
  onBack,
  onMarkUsed,
  onDeductInventory,
  onSelectRecipe
}) => {
  const [snoozed, setSnoozed] = useState(false);
  const [markedUsed, setMarkedUsed] = useState(false);
  const [deductedFeedback, setDeductedFeedback] = useState(false);
  const [timerText, setTimerText] = useState('T-48:00:00');

  // Live countdown timer simulation
  useEffect(() => {
    let secondsLeft = 48 * 3600;
    const interval = setInterval(() => {
      secondsLeft = Math.max(0, secondsLeft - 1);
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;
      setTimerText(
        `T-${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDeductClick = () => {
    onDeductInventory(item.id, 300);
    setDeductedFeedback(true);
    setTimeout(() => {
      setDeductedFeedback(false);
    }, 3000);
  };

  const handleMarkUsedClick = () => {
    onMarkUsed(item.id);
    setMarkedUsed(true);
    setTimeout(() => {
      onBack();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-between font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 pb-6">
        
        {/* Top App Bar matching Image 9 */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e0e3e8]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2.5 text-[#181c20] hover:text-[#545c64] transition-colors"
            aria-label="Back to Digital Twin"
          >
            <ArrowLeft className="w-5 h-5 text-[#181c20]" />
            <span className="font-bold text-base tracking-wide uppercase font-mono-tech">
              REMINDER
            </span>
          </button>
          
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-[#545c64] text-white flex items-center justify-center font-semibold text-xs"
            aria-label="Roommate profile"
          >
            <User className="w-4 h-4" />
          </button>
        </header>

        {/* Technical Sub-bar matching Image 9: TARGET: REMAINDER_NOTIF_V50 | BAY_R2 // SLOT_04 | NODE: #TWIN-882 */}
        <div className="grid grid-cols-3 gap-1.5 px-3 py-1.5 text-[8.5px] sm:text-[9.5px] font-mono-tech text-[#545c64] bg-[#ebeef3] border-b border-[#ced4da]">
          <div className="bg-[#f7f9ff] px-1 py-0.5 rounded border border-[#ced4da] text-center font-medium truncate">
            TARGET: REMAINDER_NOTIF_V50
          </div>
          <div className="bg-[#f7f9ff] px-1 py-0.5 rounded border border-[#ced4da] text-center font-medium truncate">
            BAY_R2 // SLOT_04
          </div>
          <div className="bg-[#f7f9ff] px-1 py-0.5 rounded border border-[#ced4da] text-center font-medium truncate">
            NODE: #TWIN-882
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* Main Expiration Alert Card */}
          <section className="bg-white rounded-xl border border-[#c4c7cb] p-4 shadow-sm relative overflow-hidden">
            
            {/* Top Tag Header */}
            <div className="flex items-center justify-between mb-3.5 gap-1.5 flex-wrap">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab] tracking-wide">
                快过期 (EXPIRING SOON)
              </span>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono-tech font-semibold bg-[#e0e3e8] text-[#181c20] border border-[#ced4da]">
                  {item.claimantLabel || '[U-01] Alex'}
                </span>
                <span className="text-xs font-mono-tech font-bold text-[#545c64]">
                  {timerText}
                </span>
              </div>
            </div>

            {/* Milk Details Row */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-14 h-16 bg-[#f1f4f9] rounded-lg border border-[#c4c7cb] flex flex-col items-center justify-center p-1 shrink-0">
                <TechMilkCartonIcon className="w-9 h-11" />
                <span className="text-[9px] font-mono-tech font-bold text-[#545c64] -mt-1">
                  1000ML
                </span>
              </div>

              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-[#181c20] leading-snug">
                  Milk expires in 2 days
                </h2>
                <p className="text-xs text-[#545c64] mt-1 leading-relaxed">
                  Organic Whole Milk • Compartment: Door Rack Top • Opened 3d ago
                </p>
              </div>
            </div>

            {/* Actions Row (View Recipe | Mark Used | Snooze) */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#ebeef3]">
              <button
                type="button"
                onClick={() => {
                  if (item.suggestedRecipes && item.suggestedRecipes[0]) {
                    onSelectRecipe(item.suggestedRecipes[0]);
                  }
                }}
                className="py-2 px-1 bg-[#f1f4f9] hover:bg-[#e0e3e8] border border-[#c4c7cb] rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold text-[#181c20] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#545c64] shrink-0" />
                <span className="whitespace-nowrap">View Recipe</span>
              </button>

              <button
                type="button"
                onClick={handleMarkUsedClick}
                className={`py-2 px-1 border rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  markedUsed
                    ? 'bg-[#181c20] text-white border-[#181c20]'
                    : 'bg-[#545c64] hover:bg-[#44474a] text-white border-[#545c64]'
                }`}
              >
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{markedUsed ? 'Used ✓' : 'Mark Used'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSnoozed(!snoozed)}
                className={`py-2 px-1 border rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  snoozed
                    ? 'bg-[#e0e3e8] border-[#212529] text-[#181c20]'
                    : 'bg-[#f1f4f9] hover:bg-[#e0e3e8] border-[#c4c7cb] text-[#181c20]'
                }`}
              >
                <BellOff className="w-3.5 h-3.5 text-[#545c64] shrink-0" />
                <span className="whitespace-nowrap">{snoozed ? 'Snoozed' : 'Snooze'}</span>
              </button>
            </div>
          </section>

          {/* Section: SUGGESTED RECIPES */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#545c64]" />
                <h3 className="text-xs font-mono-tech font-bold tracking-wider text-[#181c20] uppercase">
                  SUGGESTED RECIPES
                </h3>
              </div>
              <span className="text-[11px] font-mono-tech text-[#545c64] font-medium tracking-wide">
                USING ~400ML MILK
              </span>
            </div>

            {/* Recipe 1: White Sauce (Béchamel) */}
            <div className="bg-white rounded-xl border border-[#c4c7cb] p-3 flex items-center justify-between gap-3 shadow-sm hover:border-[#74777b] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#ebeef3] border border-[#c4c7cb] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="1.8" className="w-6 h-6">
                    <path d="M4 14 C4 18 8 20 12 20 C16 20 20 18 20 14 L20 12 L4 12 Z" fill="#FFFFFF" />
                    <path d="M7 8 C7 5 9 6 9 3" strokeLinecap="round" />
                    <path d="M12 9 C12 6 14 7 14 4" strokeLinecap="round" />
                    <path d="M17 8 C17 5 19 6 19 3" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#181c20]">
                    White Sauce (Bécha...
                  </h4>
                  <p className="text-xs text-[#545c64] mt-0.5 flex items-center gap-1.5 font-medium">
                    <span>⏱ 15 min</span>
                    <span>•</span>
                    <span>300ML REQ</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (item.suggestedRecipes && item.suggestedRecipes[0]) {
                    onSelectRecipe(item.suggestedRecipes[0]);
                  }
                }}
                className="bg-[#181c20] hover:bg-[#2d3135] text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recipe 2: Golden Milk & Oats */}
            <div className="bg-white rounded-xl border border-[#c4c7cb] p-3 flex items-center justify-between gap-3 shadow-sm hover:border-[#74777b] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#ebeef3] border border-[#c4c7cb] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="1.8" className="w-6 h-6">
                    <path d="M5 8 H17 V15 C17 18 14 19 11 19 C8 19 5 18 5 15 Z" fill="#FFFFFF" />
                    <path d="M17 9 H19 C20.5 9 21.5 10 21.5 11.5 C21.5 13 20.5 14 19 14 H17" />
                    <line x1="3" y1="21" x2="19" y2="21" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#181c20]">
                    Golden Milk & Oats
                  </h4>
                  <p className="text-xs text-[#545c64] mt-0.5 flex items-center gap-1.5 font-medium">
                    <span>⏱ 5 min</span>
                    <span>•</span>
                    <span>250ML REQ</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (item.suggestedRecipes && item.suggestedRecipes[1]) {
                    onSelectRecipe(item.suggestedRecipes[1]);
                  }
                }}
                className="bg-[#181c20] hover:bg-[#2d3135] text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* 3D Twin Link Status Banner matching Image 9 */}
          <div className="bg-[#f1f4f9] border border-[#ced4da] rounded-lg px-3 py-2 flex items-center justify-between text-xs font-mono-tech text-[#181c20]">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-[#212529]" />
              <span className="font-semibold">3D TWIN TW-04: LINKED & ACTIVE</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#545c64]" />
          </div>

          {/* Key Transaction Box */}
          <section className="bg-white rounded-xl border border-[#c4c7cb] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="font-bold uppercase tracking-wider text-[#181c20]">
                KEY TRANSACTION
              </span>
              <span className="bg-[#ebeef3] border border-[#ced4da] px-2 py-0.5 rounded text-[10px] font-semibold text-[#545c64]">
                SYS-ACTION: #RESTOCK
              </span>
            </div>

            {/* Deduct Inventory Button */}
            <button
              type="button"
              onClick={handleDeductClick}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2.5 text-sm font-bold transition-all shadow-sm ${
                deductedFeedback
                  ? 'bg-green-800 text-white'
                  : 'bg-[#181c20] hover:bg-[#2d3135] text-white'
              }`}
            >
              {deductedFeedback ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  <span>Deducted 300ML (Inventory Updated)</span>
                </>
              ) : (
                <>
                  <Package className="w-4 h-4" />
                  <span>Deduct Inventory</span>
                </>
              )}
            </button>

            {/* Info Notice Note */}
            <div className="bg-[#f1f4f9] border border-[#e0e3e8] rounded-md p-2.5 flex items-start gap-2 text-xs text-[#545c64] leading-relaxed">
              <Info className="w-4 h-4 text-[#545c64] shrink-0 mt-0.5" />
              <span>
                Deducting auto-updates 3D Fridge twin and populates Roommate Shopping List.
              </span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
