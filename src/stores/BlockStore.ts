import { Block } from "@/models/Block";
import { Store } from "./Store";

export class BlockStore extends Store<Block> {
    constructor(blocks: Block[]) {
        super(blocks);
    }

    public getItemsByRarity(rarity: string): Block[] {
        return this.items.filter(block => block.rarity === rarity) as Block[];
    }
}

const blocks: Block[] = [
    {
        name: "dirt",
        rarity: "Common",
        type: "block",
    },
    {
        name: "wood",
        rarity: "Common",
        type: "block",
    },
    {
        name: "clay",
        rarity: "Common",
        type: "block",
    },
    {
        name: "pumpkin",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "sand",
        rarity: "Common",
        type: "block",
    },
    {
        name: "cactus",
        rarity: "Common",
        type: "block",
    },
    {
        name: "sandstone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "glass",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "ice",
        rarity: "Common",
        type: "block",
    },
    {
        name: "snow",
        rarity: "Common",
        type: "block",
    },
    {
        name: "birchwood",
        rarity: "Common",
        type: "block",
    },
    {
        name: "sapphire",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "winter_candy",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "stone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "gravel",
        rarity: "Common",
        type: "block",
    },
    {
        name: "coal",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "iron",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "gold",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "diamond",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "redstone",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "copper",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "emerald",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "jasper",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "lapis_lazuli",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "deepslate",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "calcite",
        rarity: "Common",
        type: "block",
    },
    {
        name: "bedrock",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "red_sand",
        rarity: "Common",
        type: "block",
    },
    {
        name: "hardened_clay",
        rarity: "Common",
        type: "block",
    },
    {
        name: "red_sandstone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "red_cactus",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "topaz",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "tumbleweed",
        rarity: "Common",
        type: "block",
    },
    {
        name: "dandelion_seeds",
        rarity: "Common",
        type: "block",
    },
    {
        name: "coffee_beans",
        rarity: "Common",
        type: "block",
    },
    {
        name: "podzol",
        rarity: "Common",
        type: "block",
    },
    {
        name: "jungle_log",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "orchid_seeds",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "jade",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "coral",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "ocean_sand",
        rarity: "Common",
        type: "block",
    },
    {
        name: "sponge",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "live_rock",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "prismarine",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "pearl",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "static",
        rarity: "Common",
        type: "block",
    },
    {
        name: "struct",
        rarity: "Common",
        type: "block",
    },
    {
        name: "null",
        rarity: "Common",
        type: "block",
    },
    {
        name: "enum_crystal",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "bool",
        rarity: "Common",
        type: "block",
    },
    {
        name: "graviton",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "off_bit",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "on_bit",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "c_sharp",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "moon_rock",
        rarity: "Common",
        type: "block",
    },
    {
        name: "aluminum",
        rarity: "Common",
        type: "block",
    },
    {
        name: "diorite",
        rarity: "Common",
        type: "block",
    },
    {
        name: "lunar_meteorite",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "alien_ooze",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "cheese",
        rarity: "Common",
        type: "block",
    },
    {
        name: "martian_soil",
        rarity: "Common",
        type: "block",
    },
    {
        name: "granite",
        rarity: "Common",
        type: "block",
    },
    {
        name: "carbon_snow",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "carbon_ice",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "opal",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "alien_crystal",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "magma_block",
        rarity: "Common",
        type: "block",
    },
    {
        name: "andesite",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "rhyolite",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "pumice",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "basalt",
        rarity: "Uncommon",
        type: "block",
    },
    {
        name: "cinnabar",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "volcanic_quartz",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "obsidian",
        rarity: "Legendary",
        type: "block",
    },
    {
        name: "netherrack",
        rarity: "Common",
        type: "block",
    },
    {
        name: "soul_sand",
        rarity: "Common",
        type: "block",
    },
    {
        name: "nether_brick",
        rarity: "Common",
        type: "block",
    },
    {
        name: "nether_quartz",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "glowstone_dust",
        rarity: "Common",
        type: "block",
    },
    {
        name: "ruby",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "nylium",
        rarity: "Common",
        type: "block",
    },
    {
        name: "warp_wart",
        rarity: "Common",
        type: "block",
    },
    {
        name: "blackstone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "malachite",
        rarity: "Rare",
        type: "block",
    },
    {
        name: "shroomlight",
        rarity: "Common",
        type: "block",
    },
    {
        name: "ender_dust",
        rarity: "Common",
        type: "block",
    },
    {
        name: "brown_mushroom",
        rarity: "Common",
        type: "block",
    },
    {
        name: "red_mushroom",
        rarity: "Common",
        type: "block",
    },
    {
        name: "cursed_earth",
        rarity: "Common",
        type: "block",
    },
    {
        name: "dawn_stone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "dusk_stone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "mycelium",
        rarity: "Common",
        type: "block",
    },
    {
        name: "acacia_wood",
        rarity: "Common",
        type: "block",
    },
    {
        name: "amber",
        rarity: "Common",
        type: "block",
    },
    {
        name: "green_mushroom",
        rarity: "Common",
        type: "block",
    },
    {
        name: "acorn",
        rarity: "Common",
        type: "block",
    },
    {
        name: "circadian_dust",
        rarity: "Common",
        type: "block",
    },
    {
        name: "endstone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "purpur",
        rarity: "Common",
        type: "block",
    },
    {
        name: "chorus_plant",
        rarity: "Common",
        type: "block",
    },
    {
        name: "chorus_flower",
        rarity: "Common",
        type: "block",
    },
    {
        name: "endstone_bricks",
        rarity: "Common",
        type: "block",
    },
    {
        name: "amethyst",
        rarity: "Common",
        type: "block",
    },
    {
        name: "enderium",
        rarity: "Common",
        type: "block",
    },
    {
        name: "ender_essence",
        rarity: "Common",
        type: "block",
    },
    {
        name: "sand_of_clock",
        rarity: "Common",
        type: "block",
    },
    {
        name: "clock_gear",
        rarity: "Common",
        type: "block",
    },
    {
        name: "book_of_time",
        rarity: "Common",
        type: "block",
    },
    {
        name: "secret_of_time",
        rarity: "Common",
        type: "block",
    },
    {
        name: "time_stone",
        rarity: "Common",
        type: "block",
    },
    {
        name: "time_key_fragment",
        rarity: "Common",
        type: "block",
    },
    {
        name: "time_key",
        rarity: "Common",
        type: "block",
    },
    {
        name: "circuit_board",
        rarity: "Common",
        type: "block",
    },
    {
        name: "clock_spring",
        rarity: "Common",
        type: "block",
    },
    {
        name: "blight_vine",
        rarity: "Common",
        type: "block",
    },
    {
        name: "blighted",
        rarity: "Common",
        type: "block",
    },
    {
        name: "blighted_soil",
        type: "block",
        rarity: "Common",
    },
    {
        name: "ivory_wood",
        type: "block",
        rarity: "Common",
    },
    {
        name: "komatiite",
        type: "block",
        rarity: "Common",
    },
    {
        name: "mana_crystal",
        type: "block",
        rarity: "Common",
    },
    {
        name: "astral_silver",
        type: "block",
        rarity: "Common",
    },
    {
        name: "orichalcum",
        type: "block",
        rarity: "Uncommon",
    },
    {
        name: "adamantine",
        type: "block",
        rarity: "Uncommon",
    },
    {
        name: "wizard_wood",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "enchanted_soil",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "purity_shard",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "signalite",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "blighted_goo",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "unicorn_horn",
        type: "block",
        rarity: "Legendary",
    },
    {
        name: "sunstone",
        type: "block",
        rarity: "Common",
    },
    {
        name: "sunspot",
        type: "block",
        rarity: "Common",
    },
    {
        name: "plasma",
        type: "block",
        rarity: "Common",
    },
    {
        name: "star_core",
        type: "block",
        rarity: "Uncommon",
    },
    {
        name: "tritium",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "hydrogen",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "qbit",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "rocket_fuel",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "dyson_sphere_part",
        type: "block",
        rarity: "Legendary",
    },
    {
        name: "quantum_chip",
        type: "block",
        rarity: "Legendary",
    },
    {
        name: "comet_dust",
        type: "block",
        rarity: "Legendary",
    },
    {
        name: "cookie",
        type: "block",
        rarity: "Uncommon",
    },
    {
        name: "coffee",
        type: "block",
        rarity: "Uncommon",
    },
    {
        name: "special",
        type: "block",
        rarity: "Rare",
    },
    {
        name: "runic",
        type: "block",
        rarity: "Rare",
    }
]

export const blockStore = new BlockStore(blocks);