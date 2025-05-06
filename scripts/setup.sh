#!/bin/bash

# Setup script for flipcrafter project
echo "Setting up flipcrafter development environment..."

# Use Node.js v22
echo "Using Node.js v22..."
nvm use 22

# Install dependencies for scripts directory
echo "Installing script dependencies with uv..."
cd scripts
python -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install -r requirements.txt 2>/dev/null || echo "No requirements.txt found, skipping script dependencies"
deactivate
cd ..

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Setup complete! Start the development server with: nvm use 22 && npm run dev" 