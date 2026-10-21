import React, { useState } from 'react';
import {
  Refrigerator,
  Scan,
  User,
  Search,
  Bell,
  Box,
  Layers,
  Check,
  Trash2,
  Edit3,
  Plus,
  Utensils,
  Maximize2,
  Users,
  BarChart3
} from 'lucide-react';
import { TechMilkCartonIcon } from './TechnicalIcons';
import { FridgeItem, CompartmentInfo, filterItems, getExpiryStatus } from '../utils/fridgeRules';

interface DigitalTwinScreenProps {
  items: FridgeItem[];
  compartments: CompartmentInfo[];
  selectedItem: FridgeItem | null;
  onSelectItem: (item: FridgeItem) => void;
  onOpenReminder: (item: FridgeItem) => void;
  onOpenScanner: () => void;
  onOpenAddFood: (prefilledCompartment?: 'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY') => void;
  onOpenEditItem: (item: FridgeItem) => void;
  onMarkUsed: (itemId: string) => void;
  onDiscard: (itemId: string) => void;
  onOpenProfile: () => void;
  currentTab: 'TWIN' | 'LIST' | 'ROOMMATES' | 'STATS';
  onChangeTab: (tab: 'TWIN' | 'LIST' | 'ROOMMATES' | 'STATS') => void;
}

export const DigitalTwinScreen: React.FC<DigitalTwinScreenProps> = ({
  items,
  compartments,
  selectedItem,
  onSelectItem,
  onOpenReminder,
  onOpenScanner,
  onOpenAddFood,
  onOpenEditItem,
  onMarkUsed,
  onDiscard,
  onOpenProfile,
  currentTab,
  onChangeTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaimant, setSelectedClaimant] = useState<'A' | 'B' | 'C' | 'ALL'>('A');
  const [viewMode, setViewMode] = useState<'ORTHO' | 'ISO'>('ORTHO');

  const filteredItems = filterItems(
    items,
    searchQuery,
    selectedClaimant === 'ALL' ? null : selectedClaimant
  );

  const lvl1Items = items.filter((i) => i.compartment === 'LVL_01');
  const lvl2Items = items.filter((i) => i.compartment === 'LVL_02');
  const lvl3Items = items.filter((i) => i.compartment === 'LVL_03');
  const doorItems = items.filter((i) => i.compartment === 'DOOR_BAY');

  // Render individual item chip on the shelf schematic matching Image 3
  const renderItemChip = (item: FridgeItem, iconOverride?: string) => {
    const isSelected = selectedItem?.id === item.id;
    const status = getExpiryStatus(item.daysUntilExpiry);

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onSelectItem(item)}
        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all text-left border ${
          isSelected
            ? 'bg-[#181c20] text-white border-[#181c20] shadow-sm'
            : 'bg-white hover:bg-[#ebeef3] text-[#181c20] border-[#c4c7cb]'
        }`}
      >
        <span className="text-sm">
          {iconOverride || (item.iconType === 'eggs' ? '💧' : item.iconType === 'tofu' ? '🍱' : item.iconType === 'soup' ? '♨' : item.iconType === 'lettuce' ? '🥬' : item.iconType === 'apples' ? '🍎' : '📦')}
        </span>
        <span className="truncate max-w-[85px] font-medium">{item.name}</span>
        
        {/* Status indicator dot */}
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            status === 'fresh'
              ? 'bg-[#6c757d]'
              : status === 'expiring_soon'
              ? 'bg-[#212529]'
              : 'bg-[#ba1a1a]'
          }`}
          title={`Status: ${status}`}
        />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-between font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 pb-24">
        
        {/* 1. Top App Header Bar matching Image 3 */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e0e3e8]">
          <div className="flex items-center gap-2.5">
            <Refrigerator className="w-5 h-5 text-[#181c20]" />
            <h1 className="font-bold text-sm tracking-wide text-[#181c20] uppercase font-mono-tech">
              FRIDGE DIGITAL TWIN
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenScanner}
              className="p-1 text-[#545c64] hover:text-[#181c20] transition-colors"
              title="Quick QR / Barcode Scan"
              aria-label="Scan item"
            >
              <Scan className="w-5 h-5 text-[#181c20]" />
            </button>

            <button
              type="button"
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-[#545c64] text-white flex items-center justify-center font-bold text-xs"
              aria-label="Roommate profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 2. Search & Roommate Filters Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-[#e0e3e8] flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 text-[#74777b] absolute left-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search compartments or ite"
              className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#f1f4f9] border border-[#c4c7cb] rounded-lg text-[#181c20] placeholder-[#74777b] focus:outline-none focus:border-[#212529]"
            />
          </div>

          {/* Roommate Filter Chips: A, B, C */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSelectedClaimant(selectedClaimant === 'A' ? 'ALL' : 'A')}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                selectedClaimant === 'A'
                  ? 'bg-[#545c64] text-white shadow-sm'
                  : 'bg-[#ebeef3] text-[#545c64] border border-[#ced4da] hover:bg-[#e0e3e8]'
              }`}
              title="Filter Roommate A (Alex)"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setSelectedClaimant(selectedClaimant === 'B' ? 'ALL' : 'B')}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                selectedClaimant === 'B'
                  ? 'bg-[#545c64] text-white shadow-sm'
                  : 'bg-[#ebeef3] text-[#545c64] border border-[#ced4da] hover:bg-[#e0e3e8]'
              }`}
              title="Filter Roommate B (Bea)"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => setSelectedClaimant(selectedClaimant === 'C' ? 'ALL' : 'C')}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                selectedClaimant === 'C'
                  ? 'bg-[#545c64] text-white shadow-sm'
                  : 'bg-[#ebeef3] text-[#545c64] border border-[#ced4da] hover:bg-[#e0e3e8]'
              }`}
              title="Filter Roommate C (Charlie)"
            >
              C
            </button>
          </div>

          {/* Notification Bell with Badge */}
          <button
            type="button"
            onClick={() => {
              const milkItem = items.find((i) => i.id === 'milk-104') || items[0];
              onOpenReminder(milkItem);
            }}
            className="relative p-1.5 text-[#545c64] hover:text-[#181c20] transition-colors"
            aria-label="Expiring food reminders"
          >
            <Bell className="w-5 h-5 text-[#181c20]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#212529]" />
          </button>
        </div>

        {/* 3. Subheader Status Line */}
        <div className="flex items-center justify-between px-4 py-2 text-[11px] font-mono-tech text-[#545c64] border-b border-[#e0e3e8] bg-[#f7f9ff]">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#181c20]">SYS_REF: TWIN_04</span>
            <span>●</span>
            <span className="font-bold text-[#181c20]">LIVE DRAFT</span>
          </div>
          <div className="font-semibold text-[#181c20]">
            ZONE: 4 SECTIONS
          </div>
        </div>

        {/* 4. Main 3D Canvas Box matching Image 3 */}
        <div className="p-4 space-y-4">
          <section className="bg-white rounded-xl border border-[#c4c7cb] shadow-sm overflow-hidden">
            
            {/* Box Header Band */}
            <div className="bg-[#ebeef3] px-3.5 py-2 border-b border-[#ced4da] flex items-center justify-between text-xs font-mono-tech">
              <span className="font-bold tracking-wider text-[#181c20]">
                {viewMode === 'ORTHO' ? '3D CANVAS // ORTHOGRAPHIC VIEW' : '3D CANVAS // ISOMETRIC VIEW'}
              </span>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'ORTHO' ? 'ISO' : 'ORTHO')}
                className="flex items-center gap-1.5 text-[#545c64] hover:text-[#181c20] font-semibold bg-[#f7f9ff] px-2 py-0.5 rounded border border-[#ced4da]"
                title="Toggle Projection"
              >
                <Maximize2 className="w-3 h-3" />
                <span>MOD_380L</span>
              </button>
            </div>

            {/* Canvas Schematic Body */}
            <div
              className={`p-3 bg-[#f7f9ff] blueprint-grid transition-all duration-300 ${
                viewMode === 'ISO' ? 'transform perspective-[600px] rotate-x-6' : ''
              }`}
            >
              <div className="grid grid-cols-12 gap-2.5">
                
                {/* Left 3 Shelves (LVL_01, LVL_02, LVL_03) */}
                <div className="col-span-8 space-y-2">
                  
                  {/* LVL_01: UPPER */}
                  <div className="bg-white rounded-lg border border-[#c4c7cb] p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#545c64] mb-1.5 pb-1 border-b border-[#ebeef3]">
                      <span className="font-bold text-[#181c20]">LVL_01: UPPER</span>
                      <span className="font-medium">Cap: 45%</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {lvl1Items.map((item) => renderItemChip(item))}
                    </div>
                  </div>

                  {/* LVL_02: LOWER */}
                  <div className="bg-white rounded-lg border border-[#c4c7cb] p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#545c64] mb-1.5 pb-1 border-b border-[#ebeef3]">
                      <span className="font-bold text-[#181c20]">LVL_02: LOWER</span>
                      <span className="font-medium">Cap: 60%</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {lvl2Items.map((item) => renderItemChip(item))}
                      
                      {/* [EMPTY SLOT] Button matching design */}
                      <button
                        type="button"
                        onClick={() => onOpenAddFood('LVL_02')}
                        className="px-2.5 py-1.5 rounded-md text-[11px] font-mono-tech font-bold text-[#74777b] border border-dashed border-[#ced4da] hover:border-[#212529] hover:text-[#181c20] hover:bg-[#ebeef3] transition-colors flex items-center gap-1"
                      >
                        <span>[EMPTY SLOT]</span>
                      </button>
                    </div>
                  </div>

                  {/* LVL_03: CRISPER BIN */}
                  <div className="bg-white rounded-lg border border-[#c4c7cb] p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#545c64] mb-1.5 pb-1 border-b border-[#ebeef3]">
                      <span className="font-bold text-[#181c20]">LVL_03: CRISPER BIN</span>
                      <span className="font-medium text-[#545c64]">TEMP 3°C</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {lvl3Items.map((item) => renderItemChip(item))}
                    </div>
                  </div>

                </div>

                {/* Right Column: DOOR BAY */}
                <div className="col-span-4 bg-white rounded-lg border border-[#c4c7cb] p-2 flex flex-col justify-between">
                  <div className="text-[11px] font-mono-tech text-[#545c64] pb-1 border-b border-[#ebeef3] font-bold text-center">
                    DOOR BAY
                  </div>

                  <div className="space-y-2 py-1.5 flex flex-col items-center">
                    {/* Sauces item matching Image 3 */}
                    <button
                      type="button"
                      onClick={() => {
                        const sauce = doorItems.find((i) => i.id === 'sauces-401');
                        if (sauce) onSelectItem(sauce);
                      }}
                      className={`w-full py-1.5 px-1 rounded text-center border transition-all ${
                        selectedItem?.id === 'sauces-401'
                          ? 'bg-[#181c20] text-white border-[#181c20]'
                          : 'bg-[#f1f4f9] text-[#181c20] border-[#ced4da] hover:bg-[#e0e3e8]'
                      }`}
                    >
                      <div className="text-sm">🏺</div>
                      <div className="text-[10px] font-mono-tech font-bold tracking-wider">SAUCES</div>
                    </button>

                    {/* Milk item (Selected item highlighted like Image 3) */}
                    <button
                      type="button"
                      onClick={() => {
                        const milk = doorItems.find((i) => i.id === 'milk-104') || doorItems[0];
                        if (milk) onSelectItem(milk);
                      }}
                      className={`w-full p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
                        selectedItem?.id === 'milk-104' || (!selectedItem && true)
                          ? 'bg-white border-[#212529] shadow-md ring-2 ring-[#212529]'
                          : 'bg-white border-[#ced4da] hover:border-[#74777b]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded bg-[#f1f4f9] border border-[#c4c7cb] flex items-center justify-center mb-1">
                        <TechMilkCartonIcon className="w-6 h-7" />
                      </div>
                      <span className="text-xs font-bold text-[#181c20]">Milk</span>
                      <span className="mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono-tech font-bold bg-[#545c64] text-white tracking-wide">
                        EXP: 2D
                      </span>
                    </button>

                    {/* Soda item */}
                    <button
                      type="button"
                      onClick={() => {
                        const soda = doorItems.find((i) => i.id === 'soda-403');
                        if (soda) onSelectItem(soda);
                      }}
                      className={`w-full py-1.5 px-1 rounded text-center text-[10px] font-mono-tech font-bold border transition-all ${
                        selectedItem?.id === 'soda-403'
                          ? 'bg-[#181c20] text-white border-[#181c20]'
                          : 'bg-[#ebeef3] text-[#545c64] border-[#ced4da] hover:bg-[#e0e3e8]'
                      }`}
                    >
                      SODA (2)
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Status Legend Bar matching Image 3 */}
            <div className="bg-[#ebeef3] px-3.5 py-2 border-t border-[#ced4da] flex items-center justify-around text-xs font-mono-tech text-[#545c64]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6c757d]" />
                <span className="font-semibold text-[#181c20]">FRESH</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#212529]" />
                <span className="font-semibold text-[#181c20]">EXPIRING SOON</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
                <span className="font-semibold text-[#181c20]">EXPIRED</span>
              </div>
            </div>
          </section>

          {/* 5. Selected Item Detail Card matching Image 3 */}
          {selectedItem && (
            <section className="bg-white rounded-xl border border-[#c4c7cb] p-4 shadow-sm space-y-3.5">
              
              {/* Header with Icon, Name, and Badges */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-14 bg-[#f1f4f9] rounded-lg border border-[#c4c7cb] flex items-center justify-center shrink-0">
                  <TechMilkCartonIcon className="w-8 h-10" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-[#181c20]">
                      {selectedItem.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#ebeef3] border border-[#ced4da] text-[#545c64] font-semibold">
                        {selectedItem.itemCode}
                      </span>
                      <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#545c64] text-white font-bold tracking-wide">
                        EXPIRING SOON
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#545c64] mt-0.5 font-medium">
                    {selectedItem.shared ? 'Logged in Shared Inventory' : 'Private Shelf Slot'}
                  </p>
                </div>
              </div>

              {/* 2x2 Details Grid matching Image 3 */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#f7f9ff] rounded-lg border border-[#e0e3e8] text-xs">
                <div>
                  <span className="block text-[10px] font-mono-tech text-[#74777b] uppercase font-semibold">
                    QUANTITY
                  </span>
                  <span className="font-bold text-[#181c20] mt-0.5 block">
                    {selectedItem.quantityText}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-mono-tech text-[#74777b] uppercase font-semibold">
                    LOCATION
                  </span>
                  <span className="font-bold text-[#181c20] mt-0.5 block">
                    {selectedItem.locationDisplay}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-mono-tech text-[#74777b] uppercase font-semibold">
                    CLAIMANT
                  </span>
                  <span className="font-bold text-[#181c20] mt-0.5 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#545c64] text-white text-[9px] flex items-center justify-center font-bold">
                      A
                    </span>
                    <span>{selectedItem.claimantName}</span>
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-mono-tech text-[#74777b] uppercase font-semibold">
                    LIFESPAN
                  </span>
                  <span className="font-bold text-[#ba1a1a] mt-0.5 block">
                    {selectedItem.expiryNote}
                  </span>
                </div>
              </div>

              {/* Suggested Use Callout Bar matching Image 3 */}
              <div className="bg-[#f1f4f9] border border-[#ced4da] rounded-lg p-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#545c64] shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono-tech font-bold text-[#74777b] uppercase block">
                      Suggested Use
                    </span>
                    <span className="text-xs font-bold text-[#181c20]">
                      Béchamel White Sauce (15 min)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenReminder(selectedItem)}
                  className="px-3 py-1 bg-white hover:bg-[#ebeef3] text-xs font-mono-tech font-bold text-[#181c20] rounded border border-[#74777b] shadow-sm transition-colors"
                >
                  VIEW
                </button>
              </div>

              {/* Action Buttons: MARK USED | DISCARD | EDIT */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onMarkUsed(selectedItem.id)}
                  className="py-2 px-2 bg-[#545c64] hover:bg-[#44474a] text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span className="truncate">MARK USED</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDiscard(selectedItem.id)}
                  className="py-2 px-2 bg-[#f1f4f9] hover:bg-[#e0e3e8] border border-[#c4c7cb] text-[#181c20] rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#545c64]" />
                  <span className="truncate">DISCARD</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenEditItem(selectedItem)}
                  className="py-2 px-2 bg-[#f1f4f9] hover:bg-[#e0e3e8] border border-[#c4c7cb] text-[#181c20] rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#545c64]" />
                  <span className="truncate">EDIT</span>
                </button>
              </div>
            </section>
          )}

          {/* 6. Big "+ Add Food to Refrigerator" Button matching Image 3 */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => onOpenAddFood()}
              className="w-full bg-[#181c20] hover:bg-[#2d3135] active:scale-[0.99] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Food to Refrigerator</span>
            </button>

            {/* OCR / QR hint subtext */}
            <p className="text-[11px] text-[#545c64] text-center flex items-center justify-center gap-1.5 font-medium px-2">
              <Scan className="w-3.5 h-3.5 text-[#74777b]" />
              <span>Tip: Instant input supported via receipt OCR, QR scan, or NFC tap</span>
            </p>
          </div>

        </div>

        {/* 7. Bottom Navigation Bar matching Image 3 */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#ced4da] px-6 py-2.5 flex items-center justify-between z-30 shadow-md">
          <button
            type="button"
            onClick={() => onChangeTab('TWIN')}
            className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
              currentTab === 'TWIN' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
            }`}
          >
            <Box className="w-5 h-5" />
            <span>TWIN</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('LIST')}
            className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
              currentTab === 'LIST' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>LIST</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('ROOMMATES')}
            className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
              currentTab === 'ROOMMATES' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>ROOMMATES</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeTab('STATS')}
            className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
              currentTab === 'STATS' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>STATS</span>
          </button>
        </nav>

      </div>
    </div>
  );
};
