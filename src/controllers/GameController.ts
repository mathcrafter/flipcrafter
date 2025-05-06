import { GameState, CardType, GridSize } from '@/models/GameState';

// Local storage key
export const GAME_STATE_KEY = 'memory_game_state';

// Save current game state to localStorage
export const saveGameState = (
    cards: CardType[],
    moves: number,
    matches: number,
    gridSize: GridSize,
    gameComplete: boolean,
    currentBiome: string
): void => {
    if (typeof window === 'undefined') return;

    const gameState = new GameState(
        cards,
        moves,
        matches,
        gridSize,
        gameComplete,
        currentBiome
    );

    localStorage.setItem(GAME_STATE_KEY, gameState.toJSON());
};

// Load game state from localStorage
export const loadGameState = (): GameState | null => {
    if (typeof window === 'undefined') return null;

    try {
        const savedState = localStorage.getItem(GAME_STATE_KEY);
        if (!savedState) {
            return null;
        }

        return GameState.fromJSON(savedState);
    } catch (error) {
        console.error('Error loading game state:', error);
        return null;
    }
}; 