import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getExpiryStatus,
  formatCountdownTimer,
  calculateShelfCapacity,
  deductInventoryItem,
  filterItems,
  type FridgeItem
} from './fridgeRules.ts';

test('getExpiryStatus properly categorizes items by days remaining', () => {
  assert.equal(getExpiryStatus(5), 'fresh');
  assert.equal(getExpiryStatus(3), 'expiring_soon');
  assert.equal(getExpiryStatus(2), 'expiring_soon');
  assert.equal(getExpiryStatus(0), 'expiring_soon');
  assert.equal(getExpiryStatus(-1), 'expired');
});

test('formatCountdownTimer produces correct T-HH:00:00 notation', () => {
  assert.equal(formatCountdownTimer(2), 'T-48:00:00');
  assert.equal(formatCountdownTimer(1), 'T-24:00:00');
  assert.equal(formatCountdownTimer(-1), 'EXPIRED');
});

test('calculateShelfCapacity computes capacity percentage within bounds', () => {
  assert.equal(calculateShelfCapacity(2, 4), 50);
  assert.equal(calculateShelfCapacity(3, 5), 60);
  assert.equal(calculateShelfCapacity(5, 5), 100);
  assert.equal(calculateShelfCapacity(10, 5), 100);
  assert.equal(calculateShelfCapacity(0, 5), 0);
});

test('deductInventoryItem updates volume and percentage accurately', () => {
  const mockMilk: FridgeItem = {
    id: 'milk-1',
    name: 'Whole Milk 1L',
    itemCode: '#M-104',
    quantityText: '1 Bottle (80% left)',
    remainingPercent: 80,
    totalVolumeMl: 1000,
    remainingMl: 800,
    compartment: 'DOOR_BAY',
    locationDisplay: 'Door Shelf / Bay 2',
    claimantId: 'A',
    claimantName: 'Roommate A (Alex)',
    claimantLabel: '[U-01] Alex',
    daysUntilExpiry: 2,
    expiryNote: 'Expires in 2 Days',
    iconType: 'milk',
    shared: true
  };

  const { updatedItem, isDepleted } = deductInventoryItem(mockMilk, 300);
  assert.equal(isDepleted, false);
  assert.equal(updatedItem.remainingMl, 500);
  assert.equal(updatedItem.remainingPercent, 50);

  const fullDeduct = deductInventoryItem(updatedItem, 500);
  assert.equal(fullDeduct.isDepleted, true);
  assert.equal(fullDeduct.updatedItem.remainingMl, 0);
  assert.equal(fullDeduct.updatedItem.remainingPercent, 0);
});

test('filterItems filters correctly by query and claimant id', () => {
  const items: FridgeItem[] = [
    {
      id: '1',
      name: 'Whole Milk 1L',
      itemCode: '#M-104',
      quantityText: '1 Bottle',
      remainingPercent: 80,
      compartment: 'DOOR_BAY',
      locationDisplay: 'Door Shelf / Bay 2',
      claimantId: 'A',
      claimantName: 'Alex',
      claimantLabel: '[U-01] Alex',
      daysUntilExpiry: 2,
      expiryNote: '2 days',
      iconType: 'milk',
      shared: true
    },
    {
      id: '2',
      name: 'Tofu',
      itemCode: '#T-202',
      quantityText: '1 pack',
      remainingPercent: 100,
      compartment: 'LVL_01',
      locationDisplay: 'Upper Shelf',
      claimantId: 'B',
      claimantName: 'Bea',
      claimantLabel: '[U-02] Bea',
      daysUntilExpiry: 6,
      expiryNote: '6 days',
      iconType: 'tofu',
      shared: false
    }
  ];

  assert.equal(filterItems(items, '', null).length, 2);
  assert.equal(filterItems(items, 'milk', null).length, 1);
  assert.equal(filterItems(items, '', 'A').length, 1);
  assert.equal(filterItems(items, '', 'B').length, 1);
  assert.equal(filterItems(items, '', 'C').length, 0);
});
