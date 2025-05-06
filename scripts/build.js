#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Execute a command and print its output
function execute(command) {
    console.log(`Executing: ${command}`);
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing ${command}:`, error);
        process.exit(1);
    }
}

// Main build process
console.log('Starting build process...');

// Ensure we're using the correct Node version
execute('nvm use 22');

// Install dependencies for scripts directory if needed
console.log('Setting up scripts directory dependencies...');
execute('cd scripts && uv npm install || true');

// Update manifest.json with correct asset paths
console.log('Updating manifest.json with correct asset paths...');
execute('node scripts/update-manifest.js');

// Build the Next.js application
console.log('Building Next.js application...');
execute('nvm use 22 && next build');

console.log('Build completed successfully!'); 