import React, { useState } from 'react';
import { X, Scan, CheckCircle2, Camera } from 'lucide-react';
import { FridgeItem } from '../utils/fridgeRules';

interface ScannerModalProps {
  onClose: () => void;
  onScannedItem: (item: FridgeItem) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ onClose, onScannedItem }) => {
  const [scanStep, setScanStep] = useState<'aiming' | 'detected'>('aiming');
  const [detectedItem, setDetectedItem] = useState<FridgeItem | null>(null);

  const simulateScan = (itemName: string, code: string, compartment: 'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY') => {
    const item: FridgeItem = {
      id: `scanned-${Date.now()}`,
      name: itemName,
      itemCode: code,
      quantityText: '1 Package',
      remainingPercent: 100,
      compartment,
      locationDisplay: `${compartment} / Auto-Assigned`,
      claimantId: 'A',
      claimantName: 'Roommate A (Alex)',
      claimantLabel: '[U-01] Alex',
      daysUntilExpiry: 5,
      expiryNote: 'Expires in 5 Days',
      openedDaysAgo: 0,
      iconType: 'box',
      shared: true
    };
    setDetectedItem(item);
    setScanStep('detected');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-[#c4c7cb] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#ebeef3] px-4 py-3 border-b border-[#ced4da] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scan className="w-4 h-4 text-[#181c20]" />
            <span className="font-mono-tech text-xs font-bold text-[#181c20] uppercase tracking-wider">
              OPTICAL BARCODE & NFC INTAKE
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

        {/* Viewfinder Graphic */}
        <div className="p-6 bg-[#181c20] text-white flex flex-col items-center justify-center relative min-h-[220px]">
          {scanStep === 'aiming' ? (
            <div className="relative w-48 h-36 border-2 border-dashed border-[#ced4da] rounded-lg flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 animate-bounce" />
              <div className="text-center p-2">
                <Camera className="w-8 h-8 text-[#c4c7cb] mx-auto mb-1 animate-pulse" />
                <span className="text-[11px] font-mono-tech text-[#c4c7cb]">
                  ALIGN BARCODE / QR
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
              <div className="text-sm font-mono-tech font-bold text-white uppercase">
                CODE RECOGNIZED: {detectedItem?.itemCode}
              </div>
              <p className="text-xs text-[#ced4da]">
                {detectedItem?.name} identified via global grocery database.
              </p>
            </div>
          )}
        </div>

        {/* Quick simulation buttons */}
        <div className="p-4 space-y-3 bg-[#f7f9ff]">
          {scanStep === 'aiming' ? (
            <div>
              <span className="text-[11px] font-mono-tech text-[#545c64] block mb-2 font-bold uppercase">
                Simulate Scanning Demo Barcode:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => simulateScan('Oat Milk Barista 1L', 'ITEM #OM-901', 'DOOR_BAY')}
                  className="p-2 bg-white hover:bg-[#ebeef3] border border-[#c4c7cb] rounded-lg text-xs font-semibold text-[#181c20] text-left transition-colors"
                >
                  🥛 Oat Milk Barista 1L
                </button>
                <button
                  type="button"
                  onClick={() => simulateScan('Organic Strawberries', 'ITEM #SB-440', 'LVL_03')}
                  className="p-2 bg-white hover:bg-[#ebeef3] border border-[#c4c7cb] rounded-lg text-xs font-semibold text-[#181c20] text-left transition-colors"
                >
                  🍓 Fresh Strawberries
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  if (detectedItem) {
                    onScannedItem(detectedItem);
                    onClose();
                  }
                }}
                className="w-full bg-[#181c20] hover:bg-[#2d3135] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Add {detectedItem?.name} to Fridge Twin
              </button>
              <button
                type="button"
                onClick={() => setScanStep('aiming')}
                className="w-full bg-white border border-[#ced4da] text-[#545c64] py-2 rounded-lg text-xs font-semibold hover:bg-[#ebeef3]"
              >
                Scan Another Item
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
