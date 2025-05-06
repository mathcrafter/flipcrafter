#!/bin/bash

# Use Node.js 22
nvm use 22

# Install dependencies
npm install

# Setup MathCrafter theme assets
echo "Setting up MathCrafter theme assets..."
node scripts/setup-mathcrafter-assets.js

# Update theme colors
echo "Setting up MathCrafter theme colors..."
node scripts/update-mathcrafter-theme.js

echo "Setup complete! Run 'npm run dev' to start the development server." 