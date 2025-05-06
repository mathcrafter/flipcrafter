#!/usr/bin/env python3
"""
Generate placeholder images for pickaxes and blocks
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageColor
import random

# Ensure directories exist
def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# Create public assets directories
PUBLIC_DIR = "../public/assets"
PICKAXES_DIR = os.path.join(PUBLIC_DIR, "pickaxes")
BLOCKS_DIR = os.path.join(PUBLIC_DIR, "blocks")

ensure_dir(PUBLIC_DIR)
ensure_dir(PICKAXES_DIR)
ensure_dir(BLOCKS_DIR)

# Pickaxe names
pickaxe_names = [
    "wooden_pickaxe",
    "stone_pickaxe",
    "iron_pickaxe",
    "gold_pickaxe",
    "diamond_pickaxe",
    "netherite_pickaxe",
    "emerald_pickaxe",
    "ruby_pickaxe",
    "obsidian_pickaxe",
    "copper_pickaxe",
    "amethyst_pickaxe",
    "quartz_pickaxe",
]

# Block names
block_names = [
    "stone",
    "dirt",
    "grass",
    "wood",
    "sand",
    "gravel",
    "coal_ore",
    "iron_ore",
    "gold_ore",
    "diamond_ore",
    "emerald_ore",
    "obsidian",
    "bedrock",
    "netherrack",
    "soul_sand",
    "glowstone",
    "quartz_ore",
    "ancient_debris",
]

# Colors for pickaxes
pickaxe_colors = {
    "wooden": "#8B4513",
    "stone": "#808080",
    "iron": "#C0C0C0",
    "gold": "#FFD700",
    "diamond": "#00FFFF",
    "netherite": "#4A4A4A",
    "emerald": "#50C878",
    "ruby": "#E0115F",
    "obsidian": "#4A0082",
    "copper": "#B87333",
    "amethyst": "#9966CC",
    "quartz": "#FFFAFA",
}

# Colors for blocks
block_colors = {
    "stone": "#808080",
    "dirt": "#8B4513",
    "grass": "#7CFC00",
    "wood": "#DEB887",
    "sand": "#F5DEB3",
    "gravel": "#A9A9A9",
    "coal_ore": "#36454F",
    "iron_ore": "#E5E4E2",
    "gold_ore": "#FFD700",
    "diamond_ore": "#00FFFF",
    "emerald_ore": "#50C878",
    "obsidian": "#4A0082",
    "bedrock": "#2F4F4F",
    "netherrack": "#8B0000",
    "soul_sand": "#8B4513",
    "glowstone": "#FFFF00",
    "quartz_ore": "#FFFAFA",
    "ancient_debris": "#4A4A4A",
}

def generate_pickaxe_image(name, color):
    """Generate a placeholder pickaxe image"""
    img = Image.new('RGB', (200, 200), "white")
    draw = ImageDraw.Draw(img)
    
    # Draw pickaxe head
    draw.rectangle([(50, 40), (150, 70)], fill=color)
    
    # Draw handle
    draw.rectangle([(90, 70), (110, 160)], fill="#8B4513")
    
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", 12)
    except IOError:
        font = ImageFont.load_default()
    
    draw.text((70, 180), name.replace("_", " ").title(), fill="black", font=font)
    
    return img

def generate_block_image(name, color):
    """Generate a placeholder block image"""
    img = Image.new('RGB', (200, 200), "white")
    draw = ImageDraw.Draw(img)
    
    # Draw block
    draw.rectangle([(50, 50), (150, 150)], fill=color)
    
    # Add some texture (random dots)
    for _ in range(30):
        x = random.randint(50, 150)
        y = random.randint(50, 150)
        size = random.randint(2, 5)
        shade = random.randint(-50, 50)
        
        # Adjust color based on the shade
        r, g, b = ImageColor.getrgb(color)
        r = max(0, min(255, r + shade))
        g = max(0, min(255, g + shade))
        b = max(0, min(255, b + shade))
        
        draw.ellipse([(x, y), (x+size, y+size)], fill=(r, g, b))
    
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", 12)
    except IOError:
        font = ImageFont.load_default()
    
    draw.text((70, 180), name.replace("_", " ").title(), fill="black", font=font)
    
    return img

def main():
    print("Generating pickaxe images...")
    for name in pickaxe_names:
        prefix = name.split('_')[0]
        color = pickaxe_colors.get(prefix, "#000000")
        img = generate_pickaxe_image(name, color)
        img.save(os.path.join(PICKAXES_DIR, f"{name}.png"))
    
    print("Generating block images...")
    for name in block_names:
        color = block_colors.get(name, "#000000")
        img = generate_block_image(name, color)
        img.save(os.path.join(BLOCKS_DIR, f"{name}.png"))
    
    print("Done generating placeholder images!")

if __name__ == "__main__":
    main() 