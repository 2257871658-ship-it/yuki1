import { FridgeItem, CompartmentInfo, SuggestedRecipe } from '../utils/fridgeRules';

export interface Roommate {
  id: 'A' | 'B' | 'C';
  code: string;
  name: string;
  role: string;
  avatarLetter: string;
  assignedShelves: string[];
  itemsCount: number;
  sharedContributionScore: number;
}

export const ROOMMATES: Roommate[] = [
  {
    id: 'A',
    code: '[U-01]',
    name: 'Roommate A (Alex)',
    role: 'Household Admin',
    avatarLetter: 'A',
    assignedShelves: ['LVL_01: UPPER (Left)', 'DOOR_BAY (Top)'],
    itemsCount: 3,
    sharedContributionScore: 92
  },
  {
    id: 'B',
    code: '[U-02]',
    name: 'Roommate B (Bea)',
    role: 'Member',
    avatarLetter: 'B',
    assignedShelves: ['LVL_01: UPPER (Right)', 'LVL_03: CRISPER'],
    itemsCount: 2,
    sharedContributionScore: 88
  },
  {
    id: 'C',
    code: '[U-03]',
    name: 'Roommate C (Charlie)',
    role: 'Member',
    avatarLetter: 'C',
    assignedShelves: ['LVL_02: LOWER'],
    itemsCount: 1,
    sharedContributionScore: 84
  }
];

export const SUGGESTED_RECIPES: SuggestedRecipe[] = [
  {
    id: 'recipe-bechamel',
    title: 'White Sauce (Béchamel)',
    prepTimeMin: 15,
    reqAmount: '300ML REQ',
    reqAmountNumber: 300,
    icon: 'soup',
    steps: [
      'Melt 30g unsalted butter in a saucepan over medium-low heat.',
      'Whisk in 30g all-purpose flour and cook for 1-2 minutes until bubbling.',
      'Slowly pour in 300ml Whole Milk while whisking vigorously to avoid lumps.',
      'Simmer gently until thickened into a silky sauce. Season with pinch of nutmeg and salt.'
    ]
  },
  {
    id: 'recipe-oats',
    title: 'Golden Milk & Oats',
    prepTimeMin: 5,
    reqAmount: '250ML REQ',
    reqAmountNumber: 250,
    icon: 'cup',
    steps: [
      'Heat 250ml Whole Milk in a small pot with 1/2 tsp ground turmeric and 1/4 tsp cinnamon.',
      'Add 1/2 cup rolled oats and a drizzle of honey or maple syrup.',
      'Cook on medium heat for 3-4 minutes until creamy and fragrant.',
      'Top with sliced apples or toasted almonds and serve warm.'
    ]
  }
];

export const INITIAL_ITEMS: FridgeItem[] = [
  {
    id: 'milk-104',
    name: 'Whole Milk 1L',
    itemCode: 'ITEM #M-104',
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
    openedDaysAgo: 3,
    iconType: 'milk',
    shared: true,
    suggestedRecipes: SUGGESTED_RECIPES
  },
  {
    id: 'eggs-101',
    name: 'Eggs (12pk)',
    itemCode: 'ITEM #E-101',
    quantityText: '10 / 12 Remaining',
    remainingPercent: 85,
    compartment: 'LVL_01',
    locationDisplay: 'Upper Shelf / Slot 1',
    claimantId: 'A',
    claimantName: 'Roommate A (Alex)',
    claimantLabel: '[U-01] Alex',
    daysUntilExpiry: 10,
    expiryNote: 'Expires in 10 Days',
    openedDaysAgo: 4,
    iconType: 'eggs',
    shared: true
  },
  {
    id: 'tofu-102',
    name: 'Tofu (Firm)',
    itemCode: 'ITEM #T-102',
    quantityText: '1 Block (400g)',
    remainingPercent: 100,
    compartment: 'LVL_01',
    locationDisplay: 'Upper Shelf / Slot 2',
    claimantId: 'B',
    claimantName: 'Roommate B (Bea)',
    claimantLabel: '[U-02] Bea',
    daysUntilExpiry: 7,
    expiryNote: 'Expires in 7 Days',
    openedDaysAgo: 0,
    iconType: 'tofu',
    shared: false
  },
  {
    id: 'soup-201',
    name: 'Leftover Soup',
    itemCode: 'ITEM #S-201',
    quantityText: '1 Tupperware Bowl',
    remainingPercent: 60,
    compartment: 'LVL_02',
    locationDisplay: 'Lower Shelf / Left',
    claimantId: 'C',
    claimantName: 'Roommate C (Charlie)',
    claimantLabel: '[U-03] Charlie',
    daysUntilExpiry: 1,
    expiryNote: 'Expires Tomorrow',
    openedDaysAgo: 2,
    iconType: 'soup',
    shared: false
  },
  {
    id: 'lettuce-301',
    name: 'Lettuce',
    itemCode: 'ITEM #L-301',
    quantityText: '1 Head (Crisp)',
    remainingPercent: 90,
    compartment: 'LVL_03',
    locationDisplay: 'Crisper Bin / Slot A',
    claimantId: 'A',
    claimantName: 'Roommate A (Alex)',
    claimantLabel: '[U-01] Alex',
    daysUntilExpiry: 5,
    expiryNote: 'Expires in 5 Days',
    openedDaysAgo: 1,
    iconType: 'lettuce',
    shared: true
  },
  {
    id: 'apples-302',
    name: 'Apples (3)',
    itemCode: 'ITEM #A-302',
    quantityText: '3 Honeycrisp',
    remainingPercent: 75,
    compartment: 'LVL_03',
    locationDisplay: 'Crisper Bin / Slot B',
    claimantId: 'B',
    claimantName: 'Roommate B (Bea)',
    claimantLabel: '[U-02] Bea',
    daysUntilExpiry: 2,
    expiryNote: 'Expires in 2 Days',
    openedDaysAgo: 5,
    iconType: 'apples',
    shared: true
  },
  {
    id: 'sauces-401',
    name: 'SAUCES',
    itemCode: 'ITEM #SC-401',
    quantityText: 'Mayo, Sriracha, Mustard',
    remainingPercent: 65,
    compartment: 'DOOR_BAY',
    locationDisplay: 'Door Bay / Top Rack',
    claimantId: 'A',
    claimantName: 'Shared Household',
    claimantLabel: '[ALL]',
    daysUntilExpiry: 45,
    expiryNote: 'Expires in 45 Days',
    openedDaysAgo: 14,
    iconType: 'sauces',
    shared: true
  },
  {
    id: 'soda-403',
    name: 'SODA (2)',
    itemCode: 'ITEM #SD-403',
    quantityText: '2 Cans Soda Water',
    remainingPercent: 100,
    compartment: 'DOOR_BAY',
    locationDisplay: 'Door Bay / Bottom Rack',
    claimantId: 'B',
    claimantName: 'Roommate B (Bea)',
    claimantLabel: '[U-02] Bea',
    daysUntilExpiry: 60,
    expiryNote: 'Expires in 60 Days',
    openedDaysAgo: 0,
    iconType: 'soda',
    shared: false
  }
];

export const INITIAL_COMPARTMENTS: CompartmentInfo[] = [
  {
    id: 'LVL_01',
    code: 'LVL_01: UPPER',
    name: 'Upper Shelf',
    type: 'shelf',
    capacityPercent: 45,
    maxSlots: 4
  },
  {
    id: 'LVL_02',
    code: 'LVL_02: LOWER',
    name: 'Lower Shelf',
    type: 'shelf',
    capacityPercent: 60,
    maxSlots: 3
  },
  {
    id: 'LVL_03',
    code: 'LVL_03: CRISPER BIN',
    name: 'Crisper Bin',
    type: 'bin',
    capacityPercent: 70,
    tempCelsius: 3,
    maxSlots: 3
  },
  {
    id: 'DOOR_BAY',
    code: 'DOOR BAY',
    name: 'Door Shelf & Racks',
    type: 'door',
    capacityPercent: 65,
    maxSlots: 3
  }
];
