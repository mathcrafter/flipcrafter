#!/usr/bin/env node

/**
 * MathCrafter Theme Updater - Pixelated Version
 * 
 * This script helps to maintain and update the MathCrafter-inspired theme with pixelated styling.
 * It can be used to adjust theme colors, add new styles, or update existing ones.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Theme configuration
const themeConfig = {
    colors: {
        primary: '#3f51b5',
        secondary: '#f9a825',
        background: '#fafafa',
        cardBack: '#e0f2f1',
        cardFront: '#d1e9ff',
        text: '#333',
        border: '#666',
        success: '#4caf50'
    },
    fonts: {
        main: 'VT323',
        mono: 'VT323'
    },
    pixelSize: '2px'
};

// File paths
const cssFilePath = path.join(__dirname, '../src/app/globals.css');

function updateTheme() {
    console.log('Updating MathCrafter pixelated theme...');

    try {
        // Read the current CSS file
        let cssContent = fs.readFileSync(cssFilePath, 'utf8');

        // Update color variables
        cssContent = cssContent.replace(
            /:root\s*{[^}]*}/gs,
            `:root {
    --primary-color: ${themeConfig.colors.primary};
    --secondary-color: ${themeConfig.colors.secondary};
    --background-color: ${themeConfig.colors.background};
    --card-back-color: ${themeConfig.colors.cardBack};
    --card-front-color: ${themeConfig.colors.cardFront};
    --text-color: ${themeConfig.colors.text};
    --border-color: ${themeConfig.colors.border};
    --success-color: ${themeConfig.colors.success};
    --grid-background: linear-gradient(to bottom right, #f5f7fa, #e9ecef);
    --pixel-size: ${themeConfig.pixelSize};
}`
        );

        // Update font imports
        cssContent = cssContent.replace(
            /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=[^']*'\);/g,
            `@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');`
        );

        // Update font family references
        cssContent = cssContent.replace(
            /font-family: ['"][^'"]+['"], sans-serif;/g,
            `font-family: '${themeConfig.fonts.main}', monospace;`
        );

        cssContent = cssContent.replace(
            /font-family: ['"][^'"]+['"], monospace;/g,
            `font-family: '${themeConfig.fonts.mono}', monospace;`
        );

        // Write the updated CSS back to the file
        fs.writeFileSync(cssFilePath, cssContent, 'utf8');

        console.log('Pixelated theme updated successfully!');

    } catch (error) {
        console.error('Error updating theme:', error);
        process.exit(1);
    }
}

function main() {
    // Allow customizing theme colors via command line arguments
    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];

        if (arg.startsWith('--') && i + 1 < process.argv.length) {
            const key = arg.slice(2);
            const value = process.argv[++i];

            // Handle nested color properties
            if (key.includes('-')) {
                const [section, property] = key.split('-');
                if (themeConfig[section] && typeof themeConfig[section] === 'object') {
                    themeConfig[section][property] = value;
                }
            } else if (key === 'pixelSize') {
                themeConfig.pixelSize = value;
            }
        }
    }

    updateTheme();
}

main(); 