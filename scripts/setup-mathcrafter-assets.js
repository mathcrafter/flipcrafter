#!/usr/bin/env node

/**
 * MathCrafter Assets Setup
 * 
 * This script adds math-themed assets and icons to the project.
 * It creates SVG and PNG files representing mathematical symbols.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');
const MATH_ASSETS_DIR = path.join(PUBLIC_DIR, 'assets/math');

// Ensure the math assets directory exists
if (!fs.existsSync(MATH_ASSETS_DIR)) {
    fs.mkdirSync(MATH_ASSETS_DIR, { recursive: true });
    console.log(`Created directory: ${MATH_ASSETS_DIR}`);
}

// Create SVG math symbols
const mathSymbols = {
    'pi.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a7ae2"><path d="M4,5v2h10v3h-2v2h2v3h-6v2h6v2h2v-2h2v-2h-2v-3h2v-2h-2v-3h2v-2h-4h-10z"/></svg>`,

    'sigma.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a7ae2"><path d="M5,4v2h3.76l-2.5,6l2.5,6h-3.76v2h14v-2h-9.76l-2.5-6l2.5-6h9.76v-2z"/></svg>`,

    'integral.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a7ae2"><path d="M13,4C12.4,4,12,4.4,12,5v12.5c0,1.9-1.1,2.5-2,2.5v2c2.2,0,4-1.6,4-4.5V5C14,4.4,13.6,4,13,4z M10.5,5c0-1.3,1.2-3,3.5-3
    s3.5,1.7,3.5,3h-2c0-0.6-0.7-1-1.5-1S12.5,4.4,12.5,5v1h-2V5z M8.5,19c0,0.6,0.7,1,1.5,1s1.5-0.4,1.5-1v-1h2v1c0,1.3-1.2,3-3.5,3
    S7,21.3,7,20h2v-1z"/></svg>`,

    'sqrt.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a7ae2"><path d="M5,13l2-8h2l2,2h2l3-4h3l-4,5h2l-5,7h-2l2-3h-2l-3,3h-2z"/></svg>`,

    'delta.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a7ae2"><path d="M12,4L4,18h16L12,4z M12,8l4.7,8H7.3L12,8z"/></svg>`,

    'infinity.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a7ae2"><path d="M8,12c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S8,13.1,8,12z M16,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.1,10,16,10z
    M13.9,12c0-1.1-0.9-2-2-2c1.1,0,2-0.9,2-2c0,1.1,0.9,2,2,2C14.9,10,14,10.9,14,12c0,1.1,0.9,2,2,2c-1.1,0-2,0.9-2,2
    c0-1.1-0.9-2-2-2C13,14,13.9,13.1,13.9,12z M8,14c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S6.9,14,8,14z"/></svg>`
};

// Write SVG files
Object.entries(mathSymbols).forEach(([filename, content]) => {
    const filePath = path.join(MATH_ASSETS_DIR, filename);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${filePath}`);
});

// Create a simple README.md to explain these assets
const readmePath = path.join(MATH_ASSETS_DIR, 'README.md');
const readmeContent = `# Math-themed Assets

These SVG assets are used to enhance the MathCrafter theme of the FlipCrafter game.

## Available Symbols
- Pi (π)
- Sigma (∑)
- Integral (∫)
- Square Root (√)
- Delta (Δ)
- Infinity (∞)

Use these symbols to create math-themed UI elements and decorations.
`;

fs.writeFileSync(readmePath, readmeContent, 'utf8');
console.log(`Created: ${readmePath}`);

// Create a simple favicon.ico based on the Pi symbol
const faviconSvgPath = path.join(MATH_ASSETS_DIR, 'favicon.svg');
const faviconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#2a7ae2" rx="4" ry="4"/>
  <path d="M7,10v2h12v3h-3v2h3v3h-7v2h7v2h2v-2h3v-2h-3v-3h3v-2h-3v-3h3v-2h-5h-12z" fill="white"/>
</svg>`;

fs.writeFileSync(faviconSvgPath, faviconSvgContent, 'utf8');
console.log(`Created: ${faviconSvgPath}`);

console.log('\nMathCrafter assets setup complete!');
console.log('\nNOTE: To convert the SVG favicon to ICO format, you may need to use an online converter');
console.log('or install a tool like ImageMagick and run:');
console.log('convert -background transparent -define icon:auto-resize=16,32,48,64 public/assets/math/favicon.svg public/favicon.ico');

console.log('\nYou can now use these assets in your MathCrafter-themed UI.'); 