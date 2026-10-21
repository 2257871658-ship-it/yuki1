/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DigitalTwinScreen } from './components/DigitalTwinScreen';
import { ReminderScreen } from './components/ReminderScreen';
import { ListView } from './components/ListView';
import { RoommatesView } from './components/RoommatesView';
import { StatsView } from './components/StatsView';
import { RecipeModal } from './components/RecipeModal';
import { AddFoodModal } from './components/AddFoodModal';
import { ScannerModal } from './components/ScannerModal';
import { EditItemModal } from './components/EditItemModal';
import { ProfileModal } from './components/ProfileModal';
import {
  INITIAL_ITEMS,
  INITIAL_COMPARTMENTS,
  ROOMMATES,
  Roommate
} from './data/mockData';
import {
  FridgeItem,
  CompartmentInfo,
  SuggestedRecipe,
  deductInventoryItem
} from './utils/fridgeRules';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'ONBOARDING' | 'TWIN' | 'REMINDER'>('ONBOARDING');
  const [currentTab, setCurrentTab] = useState<'TWIN' | 'LIST' | 'ROOMMATES' | 'STATS'>('TWIN');

  const [items, setItems] = useState<FridgeItem[]>(INITIAL_ITEMS);
  const [compartments, setCompartments] = useState<CompartmentInfo[]>(INITIAL_COMPARTMENTS);
  const [roommates, setRoommates] = useState<Roommate[]>(ROOMMATES);
  const [activeRoommateId, setActiveRoommateId] = useState<'A' | 'B' | 'C'>('A');

  // By default, select the Whole Milk item to match Image 3 mockup
  const [selectedItem, setSelectedItem] = useState<FridgeItem | null>(() => {
    return INITIAL_ITEMS.find((i) => i.id === 'milk-104') || INITIAL_ITEMS[0];
  });

  // Modals state
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [prefilledCompartment, setPrefilledCompartment] = useState<'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY' | undefined>();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<FridgeItem | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<SuggestedRecipe | null>(null);

  // Check query params (?autostart=1 or ?screen=twin)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || params.get('screen') === 'twin') {
      setCurrentScreen('TWIN');
    } else if (params.get('screen') === 'reminder') {
      setCurrentScreen('REMINDER');
    }
  }, []);

  // Handlers
  const handleOnboardingContinue = (codeOrName: string, mode: 'create' | 'join') => {
    setCurrentScreen('TWIN');
  };

  const handleOpenReminder = (item: FridgeItem) => {
    setSelectedItem(item);
    setCurrentScreen('REMINDER');
  };

  const handleMarkUsed = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  const handleDiscard = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  const handleDeductInventory = (itemId: string, amountMl: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const { updatedItem } = deductInventoryItem(item, amountMl);
          if (selectedItem?.id === itemId) {
            setSelectedItem(updatedItem);
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleAddFood = (newItem: FridgeItem) => {
    setItems((prev) => [newItem, ...prev]);
    setSelectedItem(newItem);
  };

  const handleSaveEditItem = (updated: FridgeItem) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    if (selectedItem?.id === updated.id) {
      setSelectedItem(updated);
    }
  };

  const activeMilk = items.find((i) => i.id === 'milk-104') || items[0] || selectedItem;

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#181c20] font-sans relative selection:bg-[#212529] selection:text-white">
      
      {/* Quick Mockup Screen Switcher Bar for immediate evaluation of all 3 target screens */}
      <nav aria-label="Reference Screens Switcher" className="bg-[#181c20] text-white px-3 py-1.5 text-xs font-mono-tech flex items-center justify-between border-b border-[#2d3135] z-50 sticky top-0 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="hidden sm:inline font-bold uppercase tracking-wider text-[#ced4da]">
            TARGET MOCKUPS:
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setCurrentScreen('ONBOARDING')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              currentScreen === 'ONBOARDING'
                ? 'bg-white text-[#181c20] font-bold shadow-sm'
                : 'text-[#ced4da] hover:text-white hover:bg-[#2d3135]'
            }`}
          >
            [1] Onboard V0.9
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentScreen('TWIN');
              setCurrentTab('TWIN');
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              currentScreen === 'TWIN' && currentTab === 'TWIN'
                ? 'bg-white text-[#181c20] font-bold shadow-sm'
                : 'text-[#ced4da] hover:text-white hover:bg-[#2d3135]'
            }`}
          >
            [2] Fridge Twin
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('REMINDER')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              currentScreen === 'REMINDER'
                ? 'bg-white text-[#181c20] font-bold shadow-sm'
                : 'text-[#ced4da] hover:text-white hover:bg-[#2d3135]'
            }`}
          >
            [3] Reminder (Milk)
          </button>
        </div>
      </nav>

      {/* Screen 1: Onboarding matching Image 1 */}
      {currentScreen === 'ONBOARDING' && (
        <OnboardingScreen onContinue={handleOnboardingContinue} />
      )}

      {/* Screen 2 & Tab views */}
      {currentScreen === 'TWIN' && (
        <>
          {currentTab === 'TWIN' && (
            <DigitalTwinScreen
              items={items}
              compartments={compartments}
              selectedItem={selectedItem}
              onSelectItem={(item) => setSelectedItem(item)}
              onOpenReminder={handleOpenReminder}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenAddFood={(comp) => {
                setPrefilledCompartment(comp);
                setIsAddFoodOpen(true);
              }}
              onOpenEditItem={(item) => {
                setItemToEdit(item);
                setIsEditItemOpen(true);
              }}
              onMarkUsed={handleMarkUsed}
              onDiscard={handleDiscard}
              onOpenProfile={() => setIsProfileOpen(true)}
              currentTab={currentTab}
              onChangeTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'LIST' && (
            <div>
              <div className="p-3 bg-white border-b border-[#e0e3e8] max-w-md mx-auto flex items-center justify-between">
                <span className="font-bold text-sm font-mono-tech uppercase">FRIDGE DIGITAL TWIN // INVENTORY</span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('TWIN')}
                  className="text-xs font-mono-tech font-bold text-[#545c64] hover:text-[#181c20]"
                >
                  ← BACK TO 3D TWIN
                </button>
              </div>
              <ListView
                items={items}
                onSelectItem={(item) => {
                  setSelectedItem(item);
                  setCurrentTab('TWIN');
                }}
                onMarkUsed={handleMarkUsed}
                onDiscard={handleDiscard}
              />
              <BottomBar currentTab={currentTab} onChangeTab={setCurrentTab} />
            </div>
          )}

          {currentTab === 'ROOMMATES' && (
            <div>
              <div className="p-3 bg-white border-b border-[#e0e3e8] max-w-md mx-auto flex items-center justify-between">
                <span className="font-bold text-sm font-mono-tech uppercase">FRIDGE DIGITAL TWIN // ROOMMATES</span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('TWIN')}
                  className="text-xs font-mono-tech font-bold text-[#545c64] hover:text-[#181c20]"
                >
                  ← BACK TO 3D TWIN
                </button>
              </div>
              <RoommatesView roommates={roommates} />
              <BottomBar currentTab={currentTab} onChangeTab={setCurrentTab} />
            </div>
          )}

          {currentTab === 'STATS' && (
            <div>
              <div className="p-3 bg-white border-b border-[#e0e3e8] max-w-md mx-auto flex items-center justify-between">
                <span className="font-bold text-sm font-mono-tech uppercase">FRIDGE DIGITAL TWIN // STATS</span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('TWIN')}
                  className="text-xs font-mono-tech font-bold text-[#545c64] hover:text-[#181c20]"
                >
                  ← BACK TO 3D TWIN
                </button>
              </div>
              <StatsView />
              <BottomBar currentTab={currentTab} onChangeTab={setCurrentTab} />
            </div>
          )}
        </>
      )}

      {/* Screen 3: Reminder matching Image 9 */}
      {currentScreen === 'REMINDER' && (
        <ReminderScreen
          item={activeMilk || items[0]}
          onBack={() => setCurrentScreen('TWIN')}
          onMarkUsed={handleMarkUsed}
          onDeductInventory={handleDeductInventory}
          onSelectRecipe={(recipe) => setActiveRecipe(recipe)}
        />
      )}

      {/* Modals */}
      {isAddFoodOpen && (
        <AddFoodModal
          initialCompartment={prefilledCompartment}
          onClose={() => {
            setIsAddFoodOpen(false);
            setPrefilledCompartment(undefined);
          }}
          onAdd={handleAddFood}
        />
      )}

      {isScannerOpen && (
        <ScannerModal
          onClose={() => setIsScannerOpen(false)}
          onScannedItem={(item) => {
            handleAddFood(item);
            setIsScannerOpen(false);
          }}
        />
      )}

      {isEditItemOpen && (
        <EditItemModal
          item={itemToEdit}
          onClose={() => {
            setIsEditItemOpen(false);
            setItemToEdit(null);
          }}
          onSave={handleSaveEditItem}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          roommates={roommates}
          activeRoommateId={activeRoommateId}
          onSelectRoommate={(id) => setActiveRoommateId(id)}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {activeRecipe && (
        <RecipeModal
          recipe={activeRecipe}
          item={activeMilk}
          onClose={() => setActiveRecipe(null)}
          onCookAndDeduct={(itemId, amt) => handleDeductInventory(itemId, amt)}
        />
      )}

    </div>
  );
}

function BottomBar({
  currentTab,
  onChangeTab
}: {
  currentTab: 'TWIN' | 'LIST' | 'ROOMMATES' | 'STATS';
  onChangeTab: (tab: 'TWIN' | 'LIST' | 'ROOMMATES' | 'STATS') => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#ced4da] px-6 py-2.5 flex items-center justify-between z-30 shadow-md">
      <button
        type="button"
        onClick={() => onChangeTab('TWIN')}
        className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
          currentTab === 'TWIN' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
        }`}
      >
        <span>TWIN</span>
      </button>

      <button
        type="button"
        onClick={() => onChangeTab('LIST')}
        className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
          currentTab === 'LIST' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
        }`}
      >
        <span>LIST</span>
      </button>

      <button
        type="button"
        onClick={() => onChangeTab('ROOMMATES')}
        className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
          currentTab === 'ROOMMATES' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
        }`}
      >
        <span>ROOMMATES</span>
      </button>

      <button
        type="button"
        onClick={() => onChangeTab('STATS')}
        className={`flex flex-col items-center gap-1 text-[11px] font-mono-tech font-bold transition-colors ${
          currentTab === 'STATS' ? 'text-[#181c20]' : 'text-[#74777b] hover:text-[#181c20]'
        }`}
      >
        <span>STATS</span>
      </button>
    </nav>
  );
}
