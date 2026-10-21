import React, { useState } from 'react';
import { Search, Filter, Trash2, Check, ArrowUpDown } from 'lucide-react';
import { FridgeItem, getExpiryStatus } from '../utils/fridgeRules';

interface ListViewProps {
  items: FridgeItem[];
  onSelectItem: (item: FridgeItem) => void;
  onMarkUsed: (itemId: string) => void;
  onDiscard: (itemId: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({ items, onSelectItem, onMarkUsed, onDiscard }) => {
  const [query, setQuery] = useState('');
  const [compartmentFilter, setCompartmentFilter] = useState<string>('ALL');

  const filtered = items.filter((item) => {
    if (compartmentFilter !== 'ALL' && item.compartment !== compartmentFilter) return false;
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(query.toLowerCase()) ||
      item.claimantName.toLowerCase().includes(query.toLowerCase())
    );
  });

  const exportData = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fridge-twin-manifest-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const headers = ['ID', 'ItemCode', 'Name', 'Compartment', 'Location', 'Claimant', 'Quantity', 'DaysUntilExpiry', 'Shared'];
      const rows = filtered.map((item) => [
        item.id,
        item.itemCode,
        `"${item.name.replace(/"/g, '""')}"`,
        item.compartment,
        `"${item.locationDisplay.replace(/"/g, '""')}"`,
        `"${item.claimantName.replace(/"/g, '""')}"`,
        `"${item.quantityText.replace(/"/g, '""')}"`,
        item.daysUntilExpiry,
        item.shared ? 'Yes' : 'No'
      ]);
      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fridge-twin-manifest-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold font-mono-tech text-[#181c20] uppercase tracking-wider">
            INVENTORY MANIFEST
          </h2>
          <span className="text-[10px] font-mono-tech text-[#545c64]">
            {filtered.length} ACTIVE ITEMS
          </span>
        </div>
        
        {/* Export Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => exportData('json')}
            className="text-[10px] font-mono-tech font-bold bg-[#ebeef3] hover:bg-[#e0e3e8] border border-[#ced4da] px-2 py-1 rounded text-[#181c20] transition-colors"
            title="Download Inventory JSON"
          >
            ↓ JSON
          </button>
          <button
            type="button"
            onClick={() => exportData('csv')}
            className="text-[10px] font-mono-tech font-bold bg-[#181c20] hover:bg-[#2d3135] px-2.5 py-1 rounded text-white transition-colors"
            title="Download Inventory CSV"
          >
            ↓ CSV
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-[#74777b] absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inventory manifest..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#c4c7cb] rounded-lg focus:outline-none focus:border-[#212529]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono-tech">
          {['ALL', 'LVL_01', 'LVL_02', 'LVL_03', 'DOOR_BAY'].map((comp) => (
            <button
              key={comp}
              type="button"
              onClick={() => setCompartmentFilter(comp)}
              className={`px-2 py-1 rounded border whitespace-nowrap font-medium transition-colors ${
                compartmentFilter === comp
                  ? 'bg-[#181c20] text-white border-[#181c20]'
                  : 'bg-white text-[#545c64] border-[#ced4da] hover:bg-[#ebeef3]'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {filtered.map((item) => {
          const status = getExpiryStatus(item.daysUntilExpiry);
          return (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-[#c4c7cb] p-3 flex items-center justify-between gap-3 shadow-sm hover:border-[#74777b] transition-all"
            >
              <button
                type="button"
                onClick={() => onSelectItem(item)}
                className="flex-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#181c20]">{item.name}</span>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-[#ebeef3] text-[#545c64] border border-[#ced4da]">
                    {item.itemCode}
                  </span>
                </div>
                <div className="text-xs text-[#545c64] mt-1 flex items-center gap-2 flex-wrap">
                  <span>{item.locationDisplay}</span>
                  <span>•</span>
                  <span>{item.quantityText}</span>
                  <span>•</span>
                  <span
                    className={`font-semibold ${
                      status === 'fresh'
                        ? 'text-[#6c757d]'
                        : status === 'expiring_soon'
                        ? 'text-[#ba1a1a]'
                        : 'text-red-700 font-bold'
                    }`}
                  >
                    {item.expiryNote}
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onMarkUsed(item.id)}
                  title="Mark Used"
                  className="p-1.5 bg-[#f1f4f9] hover:bg-[#e0e3e8] border border-[#c4c7cb] rounded text-[#181c20]"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDiscard(item.id)}
                  title="Discard"
                  className="p-1.5 bg-[#f1f4f9] hover:bg-[#e0e3e8] border border-[#c4c7cb] rounded text-[#ba1a1a]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
