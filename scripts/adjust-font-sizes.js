#!/usr/bin/env node

/**
 * Font Size Adjustment Script
 * 
 * This script adjusts font sizes throughout the CSS file for better pixelation.
 * It can scale font sizes up or down by a factor to make the pixelated font more readable.
 */

const fs = require('fs');
const path = require('path');

// Default scale factor (1.0 = no change)
let scaleFactor = 1.0;

// Process command line arguments
const args = process.argv.slice(2);
if (args.length > 0) {
    const factorArg = args[0];
    if (!isNaN(parseFloat(factorArg))) {
        scaleFactor = parseFloat(factorArg);
    }
}

// File paths
const cssFilePath = path.join(__dirname, '../src/app/globals.css');

// Function to adjust font sizes
function adjustFontSizes() {
    console.log(`Adjusting font sizes with scale factor: ${scaleFactor}`);

    try {
        // Read the CSS file
        const cssContent = fs.readFileSync(cssFilePath, 'utf8');

        // Regex to match font-size declarations
        const fontSizeRegex = /font-size:\s*([0-9.]+)(rem|em|px|vw|vh|%);/g;

        // Adjust font sizes
        const updatedCss = cssContent.replace(fontSizeRegex, (match, size, unit) => {
            const newSize = (parseFloat(size) * scaleFactor).toFixed(2);
            return `font-size: ${newSize}${unit};`;
        });

        // Write the updated CSS back to the file
        fs.writeFileSync(cssFilePath, updatedCss, 'utf8');

        console.log('Font sizes adjusted successfully!');

    } catch (error) {
        console.error('Error adjusting font sizes:', error);
        process.exit(1);
    }
}

// Display usage information
console.log('Font Size Adjustment Script');
console.log('===========================');
console.log('Adjusts font sizes throughout the CSS for better pixelation.');
console.log('');
console.log('Usage:');
console.log('  node adjust-font-sizes.js [scale-factor]');
console.log('');
console.log('Examples:');
console.log('  node adjust-font-sizes.js 1.2    # Increase font sizes by 20%');
console.log('  node adjust-font-sizes.js 0.9    # Decrease font sizes by 10%');
console.log('');

// Run the adjustment
adjustFontSizes(); 