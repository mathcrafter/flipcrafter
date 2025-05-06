#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the base path from environment variable
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Function to get asset path with basePath prefix
function getAssetPath(assetPath) {
    // If the path already starts with the basePath, return it as is
    if (basePath && assetPath.startsWith(basePath)) {
        return assetPath;
    }

    // Ensure the path starts with a slash
    const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;

    // Combine basePath with the path
    return `${basePath}${normalizedPath}`;
}

// Path to the manifest.json file
const manifestPath = path.join(__dirname, '../public/manifest.json');

// Read the manifest.json file
fs.readFile(manifestPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading manifest.json:', err);
        return;
    }

    try {
        // Parse the JSON data
        const manifest = JSON.parse(data);

        // Update icon paths
        if (manifest.icons && Array.isArray(manifest.icons)) {
            manifest.icons.forEach(icon => {
                if (icon.src && icon.src.startsWith('/')) {
                    icon.src = getAssetPath(icon.src);
                }
            });
        }

        // Write the updated manifest back to the file
        fs.writeFile(
            manifestPath,
            JSON.stringify(manifest, null, 2),
            'utf8',
            writeErr => {
                if (writeErr) {
                    console.error('Error writing manifest.json:', writeErr);
                    return;
                }
                console.log('Successfully updated manifest.json with correct asset paths');
            }
        );
    } catch (parseErr) {
        console.error('Error parsing manifest.json:', parseErr);
    }
}); 