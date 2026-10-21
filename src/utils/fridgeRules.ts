export type ExpiryStatus = 'fresh' | 'expiring_soon' | 'expired';

export interface SuggestedRecipe {
  id: string;
  title: string;
  prepTimeMin: number;
  reqAmount: string;
  reqAmountNumber: number;
  icon: string;
  steps: string[];
}

export interface FridgeItem {
  id: string;
  name: string;
  itemCode: string;
  quantityText: string;
  remainingPercent: number;
  compartment: 'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY';
  locationDisplay: string;
  claimantId: 'A' | 'B' | 'C';
  claimantName: string;
  claimantLabel: string;
  daysUntilExpiry: number;
  expiryNote: string;
  openedDaysAgo?: number;
  totalVolumeMl?: number;
  remainingMl?: number;
  iconType: 'milk' | 'eggs' | 'tofu' | 'soup' | 'lettuce' | 'apples' | 'sauces' | 'soda' | 'box';
  shared: boolean;
  suggestedRecipes?: SuggestedRecipe[];
}

export interface CompartmentInfo {
  id: 'LVL_01' | 'LVL_02' | 'LVL_03' | 'DOOR_BAY';
  code: string;
  name: string;
  type: 'shelf' | 'bin' | 'door';
  capacityPercent: number;
  tempCelsius?: number;
  maxSlots: number;
}

export function getExpiryStatus(daysUntilExpiry: number): ExpiryStatus {
  if (daysUntilExpiry < 0) {
    return 'expired';
  }
  if (daysUntilExpiry <= 3) {
    return 'expiring_soon';
  }
  return 'fresh';
}

export function formatCountdownTimer(daysUntilExpiry: number): string {
  if (daysUntilExpiry < 0) {
    return 'EXPIRED';
  }
  const totalHours = Math.max(0, Math.floor(daysUntilExpiry * 24));
  const hh = String(totalHours).padStart(2, '0');
  return `T-${hh}:00:00`;
}

export function calculateShelfCapacity(currentSlotCount: number, maxSlots: number): number {
  if (maxSlots <= 0) return 0;
  return Math.min(100, Math.round((currentSlotCount / maxSlots) * 100));
}

export function deductInventoryItem(
  item: FridgeItem,
  amountMlToDeduct: number
): { updatedItem: FridgeItem; isDepleted: boolean } {
  const currentMl = item.remainingMl ?? Math.round(((item.remainingPercent ?? 100) / 100) * (item.totalVolumeMl ?? 1000));
  const totalMl = item.totalVolumeMl ?? 1000;
  const newMl = Math.max(0, currentMl - amountMlToDeduct);
  const newPercent = Math.max(0, Math.round((newMl / totalMl) * 100));
  const isDepleted = newMl <= 0;

  const updatedItem: FridgeItem = {
    ...item,
    remainingMl: newMl,
    remainingPercent: newPercent,
    quantityText: newMl <= 0 ? 'Depleted (Empty)' : `1 Bottle (${newPercent}% left)`
  };

  return { updatedItem, isDepleted };
}

export function filterItems(
  items: FridgeItem[],
  query: string,
  selectedClaimantId: string | null
): FridgeItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    if (selectedClaimantId && selectedClaimantId !== 'ALL' && item.claimantId !== selectedClaimantId) {
      return false;
    }
    if (!normalizedQuery) return true;

    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.itemCode.toLowerCase().includes(normalizedQuery) ||
      item.locationDisplay.toLowerCase().includes(normalizedQuery) ||
      item.claimantName.toLowerCase().includes(normalizedQuery)
    );
  });
}
