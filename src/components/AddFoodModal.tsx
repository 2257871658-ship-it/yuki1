import React, { useState } from 'react';
import { X, Plus, Scan, Sparkles, Check } from 'lucide-react';
import { FridgeItem, CompartmentInfo } from '../utils/fridgeRules';

interface AddFoodModalProps {
  initialCompartment?: 'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY';
  onClose: () => void;
  onAdd: (item: FridgeItem) => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
  initialCompartment = 'LVL_01',
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [compartment, setCompartment] = useState<'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY'>(initialCompartment);
  const [claimantId, setClaimantId] = useState<'A' | 'B' | 'C'>('A');
  const [quantity, setQuantity] = useState('1 Item');
  const [daysUntilExpiry, setDaysUntilExpiry] = useState(7);
  const [isShared, setIsShared] = useState(true);
  const [isScanningOcr, setIsScanningOcr] = useState(false);

  const simulateOcrScan = () => {
    setIsScanningOcr(true);
    setTimeout(() => {
      setName('Greek Yogurt 500g');
      setCompartment('LVL_01');
      setClaimantId('A');
      setQuantity('1 Tub (500g)');
      setDaysUntilExpiry(8);
      setIsShared(true);
      setIsScanningOcr(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const claimantNames = {
      A: 'Roommate A (Alex)',
      B: 'Roommate B (Bea)',
      C: 'Roommate C (Charlie)'
    };
    const claimantLabels = {
      A: '[U-01] Alex',
      B: '[U-02] Bea',
      C: '[U-03] Charlie'
    };

    const compartmentLocations = {
      LVL_01: 'Upper Shelf / Slot 3',
      LVL_02: 'Lower Shelf / Center',
      LVL_03: 'Crisper Bin / Slot C',
      DOOR_BAY: 'Door Bay / Middle Rack'
    };

    const newItem: FridgeItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      itemCode: `ITEM #${name.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      quantityText: quantity,
      remainingPercent: 100,
      compartment,
      locationDisplay: compartmentLocations[compartment],
      claimantId,
      claimantName: claimantNames[claimantId],
      claimantLabel: claimantLabels[claimantId],
      daysUntilExpiry,
      expiryNote: `Expires in ${daysUntilExpiry} Days`,
      openedDaysAgo: 0,
      iconType: name.toLowerCase().includes('milk') ? 'milk' : name.toLowerCase().includes('soup') ? 'soup' : 'box',
      shared: isShared
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-[#c4c7cb] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#ebeef3] px-4 py-3 border-b border-[#ced4da] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#181c20]" />
            <span className="font-mono-tech text-xs font-bold text-[#181c20] uppercase tracking-wider">
              ADD FOOD TO REFRIGERATOR
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

        {/* OCR Shortcut Button */}
        <div className="bg-[#f1f4f9] px-4 py-2.5 border-b border-[#ced4da] flex items-center justify-between">
          <span className="text-xs text-[#545c64] font-medium">Quick Intake:</span>
          <button
            type="button"
            onClick={simulateOcrScan}
            disabled={isScanningOcr}
            className="text-xs font-mono-tech font-bold bg-white hover:bg-[#e0e3e8] border border-[#74777b] text-[#181c20] px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#545c64]" />
            <span>{isScanningOcr ? 'Scanning Receipt...' : 'Receipt OCR Autofill'}</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div>
            <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
              Food Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Greek Yogurt 500g"
              required
              className="w-full px-3 py-2 text-sm bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
                Compartment
              </label>
              <select
                value={compartment}
                onChange={(e) => setCompartment(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
              >
                <option value="LVL_01">LVL_01: UPPER (45%)</option>
                <option value="LVL_02">LVL_02: LOWER (60%)</option>
                <option value="LVL_03">LVL_03: CRISPER BIN</option>
                <option value="DOOR_BAY">DOOR BAY</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
                Claimant / Owner
              </label>
              <select
                value={claimantId}
                onChange={(e) => setClaimantId(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
              >
                <option value="A">[U-01] Alex</option>
                <option value="B">[U-02] Bea</option>
                <option value="C">[U-03] Charlie</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
                Quantity / Volume
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 1 Bottle, 500g"
                className="w-full px-3 py-2 text-xs bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
                Days to Expiry
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={daysUntilExpiry}
                onChange={(e) => setDaysUntilExpiry(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
              />
            </div>
          </div>

          {/* Shared Toggle */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#181c20]">
              <input
                type="checkbox"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
                className="rounded border-[#74777b] text-[#212529] focus:ring-0 w-4 h-4"
              />
              <span className="font-semibold">Log in Household Shared Inventory</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#181c20] hover:bg-[#2d3135] text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Confirm & Place in 3D Twin</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
