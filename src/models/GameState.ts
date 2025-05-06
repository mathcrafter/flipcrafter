export interface IGameState {
    cards: CardType[];
    moves: number;
    matches: number;
    gridSize: GridSize;
    gameComplete: boolean;
    currentBiome: string;
}

export interface CardType {
    id: number;
    type: string; // 'pickaxe' or 'block'
    name: string;
    matched: boolean;
    flipped: boolean;
    rarity: string;
}

export interface GridSize {
    rows: number;
    columns: number;
}

export class GameState implements IGameState {
    cards: CardType[];
    moves: number;
    matches: number;
    gridSize: GridSize;
    gameComplete: boolean;
    currentBiome: string;

    constructor(
        cards: CardType[] = [],
        moves: number = 0,
        matches: number = 0,
        gridSize: GridSize = { rows: 4, columns: 4 },
        gameComplete: boolean = false,
        currentBiome: string = 'plains'
    ) {
        this.cards = cards;
        this.moves = moves;
        this.matches = matches;
        this.gridSize = gridSize;
        this.gameComplete = gameComplete;
        this.currentBiome = currentBiome;
    }

    static fromJSON(json: string): GameState {
        const data = JSON.parse(json);
        return new GameState(
            data.cards,
            data.moves,
            data.matches,
            data.gridSize,
            data.gameComplete,
            data.currentBiome || 'plains'
        );
    }

    toJSON(): string {
        return JSON.stringify({
            cards: this.cards,
            moves: this.moves,
            matches: this.matches,
            gridSize: this.gridSize,
            gameComplete: this.gameComplete,
            currentBiome: this.currentBiome
        });
    }
};
