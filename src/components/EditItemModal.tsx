import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { FridgeItem } from '../utils/fridgeRules';

interface EditItemModalProps {
  item: FridgeItem | null;
  onClose: () => void;
  onSave: (updatedItem: FridgeItem) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave }) => {
  if (!item) return null;

  const [name, setName] = useState(item.name);
  const [quantityText, setQuantityText] = useState(item.quantityText);
  const [daysUntilExpiry, setDaysUntilExpiry] = useState(item.daysUntilExpiry);
  const [locationDisplay, setLocationDisplay] = useState(item.locationDisplay);
  const [shared, setShared] = useState(item.shared);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FridgeItem = {
      ...item,
      name,
      quantityText,
      daysUntilExpiry,
      expiryNote: daysUntilExpiry <= 0 ? 'Expired' : `Expires in ${daysUntilExpiry} Days`,
      locationDisplay,
      shared
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-[#c4c7cb] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#ebeef3] px-4 py-3 border-b border-[#ced4da] flex items-center justify-between">
          <span className="font-mono-tech text-xs font-bold text-[#181c20] uppercase tracking-wider">
            EDIT ITEM BLUEPRINT ({item.itemCode})
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#545c64] hover:text-[#181c20] rounded"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div>
            <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
                Quantity Info
              </label>
              <input
                type="text"
                value={quantityText}
                onChange={(e) => setQuantityText(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
                Days to Expiry
              </label>
              <input
                type="number"
                value={daysUntilExpiry}
                onChange={(e) => setDaysUntilExpiry(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#181c20] mb-1">
              Location Slot
            </label>
            <input
              type="text"
              value={locationDisplay}
              onChange={(e) => setLocationDisplay(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#74777b] rounded-lg focus:border-[#212529] focus:outline-none"
            />
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#181c20]">
              <input
                type="checkbox"
                checked={shared}
                onChange={(e) => setShared(e.target.checked)}
                className="rounded border-[#74777b] text-[#212529] focus:ring-0 w-4 h-4"
              />
              <span className="font-semibold">Shared with Household Roommates</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#181c20] hover:bg-[#2d3135] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
