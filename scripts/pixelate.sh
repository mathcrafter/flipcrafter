#!/bin/bash

# Pixelate theme script
# Usage: ./scripts/pixelate.sh [pixel-size]
# Example: ./scripts/pixelate.sh 3px

# Use Node.js 22
nvm use 22

# Set default pixel size if not provided
PIXEL_SIZE=${1:-"2px"}

echo "Applying pixelated theme with pixel size: $PIXEL_SIZE"

# Run the theme updater with the specified pixel size
node scripts/update-mathcrafter-theme.js --pixelSize "$PIXEL_SIZE"

echo "Pixelated theme applied! Run 'npm run dev' to see the changes." 