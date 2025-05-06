# FlipCrafter Memory Game

A fun memory matching game where you flip cards to match pickaxes and blocks.

## Features

- 6x6 grid of cards with pickaxes and blocks
- Flip cards to find matching pairs
- Track moves and matches
- Game completion detection

## Setup

1. Make sure you have Node.js 22 installed (or use nvm)
2. Clone this repository
3. Run the setup script:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

4. Generate placeholder images for the game:

```bash
cd scripts
uv pip install -r requirements.txt
python generate_placeholders.py
cd ..
```

## Development

To run the development server:

```bash
nvm use 22
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To build the production version:

```bash
nvm use 22
npm run build
```

## Technologies Used

- Next.js
- React
- TypeScript
- CSS Grid for layout 