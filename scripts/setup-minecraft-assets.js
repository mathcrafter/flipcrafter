#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Create directories if they don't exist
const dirs = [
    path.join(__dirname, '../public/fonts'),
    path.join(__dirname, '../public/assets/textures'),
    path.join(__dirname, '../public/assets/sounds')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Download Minecraft font
const fontUrl = 'https://raw.githubusercontent.com/South-Paw/typeface-minecraft/master/font/minecraft.woff2';
const fontPath = path.join(__dirname, '../public/fonts/minecraft.woff2');

console.log('Downloading Minecraft font...');
https.get(fontUrl, (response) => {
    const fileStream = fs.createWriteStream(fontPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
        fileStream.close();
        console.log('Minecraft font downloaded successfully');
    });
}).on('error', (err) => {
    console.error('Error downloading font:', err.message);
});

// Download dirt texture for background
const dirtUrl = 'https://raw.githubusercontent.com/South-Paw/typeface-minecraft/master/example/assets/background.png';
const dirtPath = path.join(__dirname, '../public/assets/textures/dirt.png');

console.log('Downloading dirt texture...');
https.get(dirtUrl, (response) => {
    const fileStream = fs.createWriteStream(dirtPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
        fileStream.close();
        console.log('Dirt texture downloaded successfully');
    });
}).on('error', (err) => {
    console.error('Error downloading dirt texture:', err.message);
});

// Create sounds directory and placeholder files
const soundsDir = path.join(__dirname, '../public/assets/sounds');
if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir, { recursive: true });
}

// Create placeholder sound files
const clickSoundPath = path.join(soundsDir, 'click.mp3');
const levelupSoundPath = path.join(soundsDir, 'levelup.mp3');

// Just create empty files for now - users can add actual sound files later
if (!fs.existsSync(clickSoundPath)) {
    fs.writeFileSync(clickSoundPath, '');
    console.log('Created placeholder click sound file');
}

if (!fs.existsSync(levelupSoundPath)) {
    fs.writeFileSync(levelupSoundPath, '');
    console.log('Created placeholder levelup sound file');
}

// Create a basic Minecraft-style stone texture
const stoneTexturePath = path.join(__dirname, '../public/assets/textures/stone.png');
console.log('Creating stone texture...');

// Create a very simple stone texture (gray with noise)
const stonePNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTM3QzFCQ0E1MTY3MTFFNDk4NjFGRTY1QTU3RjhEMTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTM3QzFCQ0I1MTY3MTFFNDk4NjFGRTY1QTU3RjhEMTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMzdDMUJDODUxNjcxMUU0OTg2MUZFNjVBNTdGOEQxNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMzdDMUJDOTUxNjcxMUU0OTg2MUZFNjVBNTdGOEQxNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpxjvssAAAAMUExURZeXl4yMjJycnJKSkl4PASIAAAAEdFJOU////wBAKqn0AAABPUlEQVR42oySUZLDIAxDRej9L71ywS0Qpvtj54ltSZYDyu/uKD+HGw9FCBOEKIpZYWYkJGRo5SiYgkCGYKTwFnxzCIVJkfFu5o43MnxeSr2SR+UY+OUyXwJwsCVDYzTVLJIBQx7q6GXDiAVH86DM8YYaNeVOYBuWL0UBdBnBTUiza6irm4cSCzRXrezGUO/aYCeNmZEEYg4DyOvG4prZCcCO4wNA1ObJGjCczPDFXDEgT/UzAIZMQAM409wZAPJw5wWg1QRafUwREBbXDJEAIfsVgLvM5qgArC8wj5rzAGDpA5Cb6SQA6wCIw7IAAFsHzLViQVZWI1D9eQBqI1JwXhPo7oD0VhOYOmzCLgfwZm4GaNsTgL0PANkT2NsywJO5GYDJ3ACQ5iYAdi+B/sA0N99TBnj9RxxgOI++fX4EGAAY5RqKEE5rjAAAAABJRU5ErkJggg==',
    'base64'
);

fs.writeFileSync(stoneTexturePath, stonePNG);
console.log('Stone texture created');

// Create button texture (simple gray box)
const buttonTexturePath = path.join(__dirname, '../public/assets/textures/button.png');
const buttonPNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAQAAAAhFJrCAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBxABLw8JaRjnAAABeUlEQVRo3u3YsW3DMBCFYUqZQJmAK3UewN0H0CTuM4MnyDZZwY0X8BSpU9ApgtQZvItkyTbQsM9BwqLgizhSxP9wGIZhGIZhGIZhGIZhGIZhmB6j9C6gd0Cc3gUO0Yv23TxXAEu9MvwvgLuIyNAcAGaRqTlAz9ofIpOe7wFMoqoNYDQDAPkIvS+Aotz+6BrgYA7QHJAn0KyMrwUoCw3XAZRyLe0Auox78NsXAi1HANUfj3E3QKlcTzcCjBUwNgcoPSXrANDiNm4ASKsL1wxQzufqbVFVAKXA5dcf0eIA9TbWAYDKTcC07i8aAar3wPYDKvfJ7MMA1Xvo9gJW9s99jAOMnafZNnZlj0N8tP51r1EDlD/FXhvA5R3g5qv2Y/+r4Hn/3+/9d28BCIhnrZ+Nj9P3gLIADscuAAAAAElFTkSuQmCC',
    'base64'
);

fs.writeFileSync(buttonTexturePath, buttonPNG);
console.log('Button texture created');

console.log('Minecraft assets setup complete!'); 