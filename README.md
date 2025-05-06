# FlipCrafter Memory Game

A fun mathematical memory matching game inspired by MathCrafter, where you flip cards to find matching pairs. Features a retro pixelated design using the VT323 font.

## Features

- Memory game with pixelated retro design
- Customizable grid size
- Track moves and matches
- Math-themed styling and elements
- Responsive design for all devices
- Pixel-perfect styling with sharp edges

## Setup

1. Make sure you have Node.js 22 installed (or use nvm)
2. Clone this repository
3. Run the setup script:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## Development

To run the development server:

```bash
nvm use 22
npm run dev
```

Or use the provided script:

```bash
./scripts/dev.sh
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To build the production version:

```bash
./scripts/build.sh
```

## Customizing the Pixelated Theme

You can customize the pixelated theme colors, fonts, and pixel size by modifying the `themeConfig` object in `scripts/update-mathcrafter-theme.js` and then running:

```bash
node scripts/update-mathcrafter-theme.js
```

Or specify colors and pixel size directly via command line:

```bash
node scripts/update-mathcrafter-theme.js --colors-primary "#3f51b5" --pixelSize "3px"
```

### Pixel Size Adjustment

To quickly adjust the pixel size throughout the application, use the pixelate script:

```bash
./scripts/pixelate.sh 3px  # Sets pixel size to 3px
./scripts/pixelate.sh 1px  # Sets pixel size to 1px (less pixelated)
./scripts/pixelate.sh 4px  # Sets pixel size to 4px (more pixelated)
```

### Font Size Adjustment

To scale all font sizes up or down for better readability with the pixelated font:

```bash
node scripts/adjust-font-sizes.js 1.2  # Increase all font sizes by 20%
node scripts/adjust-font-sizes.js 0.9  # Decrease all font sizes by 10%
```

## Technologies Used

- Next.js
- React
- TypeScript
- VT323 pixelated font
- Pixel-perfect CSS styling
- SVG math symbols
- Responsive CSS Grid layout

## Inspiration

This project is designed with a similar look and feel to [mathcrafter.github.io/mathcrafter](https://mathcrafter.github.io/mathcrafter/), with a clean academic style that's been enhanced with a nostalgic pixel-art aesthetic, perfect for educational games. 