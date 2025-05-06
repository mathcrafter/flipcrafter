export interface Cost {
    amount: number;
    itemType: string;
}

export interface Pickaxe {
    name: string;
    strength: number;
    critical: number;
    cost: Cost;
    power: string;
    rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Seasonal" | "Legendary";
    description: string;
    notes: string;
    maxHealth: number;
}