#!/bin/bash

# Use Node.js 22
nvm use 22

# Install dependencies using uv (for the scripts directory)
cd scripts
uv pip install -r requirements.txt

# Install npm dependencies for the main project
cd ..
npm install 