import { GridSize } from "@/models/GameState";

// Setup Screen Component
const SetupScreen: React.FC<{
    gridSize: GridSize;
    onGridSizeChange: (dimension: 'rows' | 'columns', value: number) => void;
    onStartNewGame: () => void;
    onContinueSavedGame: () => void;
    hasSavedGame: boolean;
    getTotalCards: () => number;
}> = ({ gridSize, onGridSizeChange, onStartNewGame, onContinueSavedGame, hasSavedGame, getTotalCards }) => {
    return (
        <div className="setup-screen">
            <h1>FlipCrafter Memory Game</h1>

            <div className="setup-options">
                <div className="grid-config">
                    <h2>Grid Size</h2>
                    <div className="setting">
                        <label htmlFor="setup-rows">Rows: {gridSize.rows}</label>
                        <input
                            type="range"
                            id="setup-rows"
                            min="2"
                            max="8"
                            value={gridSize.rows}
                            onChange={(e) => onGridSizeChange('rows', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="setting">
                        <label htmlFor="setup-columns">Columns: {gridSize.columns}</label>
                        <input
                            type="range"
                            id="setup-columns"
                            min="2"
                            max="8"
                            value={gridSize.columns}
                            onChange={(e) => onGridSizeChange('columns', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="setting">
                        <p>Total Cards: {getTotalCards()}</p>
                    </div>
                </div>

                <div className="setup-actions">
                    <button
                        className="start-new-game"
                        onClick={onStartNewGame}
                    >
                        Start New Game
                    </button>

                    {hasSavedGame && (
                        <button
                            className="continue-game"
                            onClick={onContinueSavedGame}
                        >
                            Continue Saved Game
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SetupScreen;
