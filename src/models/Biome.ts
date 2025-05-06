export interface Biome {
    name: string;
    description: string;
    availableBlocks: string[];
    availablePickaxes: string[];
    maxHealth: number;
    cost: {
        amount: number;
        itemType: string;
    } | null;
    chest: string;
}