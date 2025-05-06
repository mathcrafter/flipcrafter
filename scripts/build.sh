#!/bin/bash

# Use Node.js 22
nvm use 22

# Build the Next.js application for production
echo "Building FlipCrafter for production..."
npm run build

echo "Build complete! To start the production server, run:"
echo "npm run start" 