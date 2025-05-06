import { biomeStore } from "@/stores/BiomeStore";
import { chestStore } from "@/stores/ChestStore";
import { getAssetPath } from "@/utils/assetPath";
import { Chest } from "./Chest";

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