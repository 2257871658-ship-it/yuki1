import React, { useState } from 'react';
import { X, Clock, CheckCircle2, ChevronRight, Package, Utensils } from 'lucide-react';
import { SuggestedRecipe, FridgeItem } from '../utils/fridgeRules';

interface RecipeModalProps {
  recipe: SuggestedRecipe | null;
  item: FridgeItem | null;
  onClose: () => void;
  onCookAndDeduct: (itemId: string, amountMl: number) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  item,
  onClose,
  onCookAndDeduct
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isDone, setIsDone] = useState(false);

  if (!recipe) return null;

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  const handleFinish = () => {
    if (item) {
      onCookAndDeduct(item.id, recipe.reqAmountNumber);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-[#c4c7cb] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#ebeef3] px-4 py-3 border-b border-[#ced4da] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[#545c64]" />
            <span className="font-mono-tech text-xs font-bold text-[#181c20] uppercase tracking-wider">
              RECIPE BLUEPRINT
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

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {recipe.icon === 'soup' ? '♨' : '☕'}
              </span>
              <h3 className="text-xl font-bold text-[#181c20]">
                {recipe.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono-tech text-[#545c64] mt-2">
              <span className="flex items-center gap-1 bg-[#f1f4f9] px-2 py-0.5 rounded border border-[#ced4da]">
                <Clock className="w-3.5 h-3.5" />
                <span>{recipe.prepTimeMin} MIN PREP</span>
              </span>
              <span className="bg-[#e0e3e8] px-2 py-0.5 rounded border border-[#ced4da] font-bold text-[#181c20]">
                {recipe.reqAmount}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#545c64] leading-relaxed">
            Using near-expiry milk directly reduces household food waste and updates your roommate shared consumption ledger.
          </p>

          {/* Steps */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20]">
              PREPARATION STEPS
            </h4>
            <div className="space-y-2">
              {recipe.steps.map((step, idx) => {
                const checked = completedSteps.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleStep(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 transition-all ${
                      checked
                        ? 'bg-[#f1f4f9] border-[#ced4da] line-through text-[#74777b]'
                        : 'bg-white border-[#c4c7cb] text-[#181c20] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center ${
                        checked ? 'bg-[#212529] border-[#212529] text-white' : 'border-[#74777b]'
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{step}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleFinish}
              className={`w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isDone
                  ? 'bg-green-800 text-white'
                  : 'bg-[#181c20] hover:bg-[#2d3135] text-white shadow-sm'
              }`}
            >
              {isDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  <span>Deducted & Updated Twin!</span>
                </>
              ) : (
                <>
                  <Package className="w-4 h-4" />
                  <span>Finish & Deduct {recipe.reqAmountNumber}ML from Twin</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
