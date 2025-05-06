#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('Setting up Minecraft theme for FlipCrafter...');

// Run the setup script to download Minecraft assets
console.log('Downloading Minecraft assets...');
try {
    execSync('node ' + path.join(__dirname, 'setup-minecraft-assets.js'), { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to download Minecraft assets:', error);
    process.exit(1);
}

// Install or update any needed dependencies
console.log('Installing required dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to install dependencies:', error);
    process.exit(1);
}

// Make the script files executable
try {
    execSync('chmod +x ' + path.join(__dirname, 'setup-minecraft-assets.js'), { stdio: 'inherit' });
    execSync('chmod +x ' + path.join(__dirname, 'install-minecraft-theme.js'), { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to make scripts executable:', error);
}

console.log('Minecraft theme setup complete!');
console.log('');
console.log('To start the game, run:');
console.log('npm run dev'); 