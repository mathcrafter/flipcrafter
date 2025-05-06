'use client';

import React from 'react';
import { loadGameState, GAME_STATE_KEY } from '@/controllers/GameController';
import { GameState, GridSize } from '@/models/GameState';

interface StartScreenProps {
    onStartNewGame: (gridSize: GridSize) => void;
    onLoadGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartNewGame, onLoadGame }) => {
    const [gridSize, setGridSize] = React.useState<GridSize>({ rows: 4, columns: 4 });
    const hasSavedGame = typeof window !== 'undefined' && localStorage.getItem(GAME_STATE_KEY) !== null;

    const handleGridSizeChange = (dimension: 'rows' | 'columns', value: number) => {
        setGridSize(prev => ({
            ...prev,
            [dimension]: value
        }));
    };

    return (
        <div className="start-screen">
            <div className="start-screen-content">
                <h2>Welcome to FlipCrafter</h2>
                <p>Match pairs of cards to win. The fewer moves, the better your score!</p>

                <div className="grid-settings">
                    <h3>Grid Size</h3>
                    <div className="setting">
                        <label htmlFor="rows">Rows: {gridSize.rows}</label>
                        <input
                            type="range"
                            id="rows"
                            min="2"
                            max="8"
                            value={gridSize.rows}
                            onChange={(e) => handleGridSizeChange('rows', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="setting">
                        <label htmlFor="columns">Columns: {gridSize.columns}</label>
                        <input
                            type="range"
                            id="columns"
                            min="2"
                            max="8"
                            value={gridSize.columns}
                            onChange={(e) => handleGridSizeChange('columns', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="setting">
                        <p>Total Cards: {gridSize.rows * gridSize.columns}</p>
                    </div>
                </div>

                <div className="start-buttons">
                    <button
                        className="start-button primary-button"
                        onClick={() => onStartNewGame(gridSize)}
                    >
                        Start New Game
                    </button>

                    <button
                        className="start-button secondary-button"
                        onClick={onLoadGame}
                        disabled={!hasSavedGame}
                    >
                        {hasSavedGame ? 'Continue Saved Game' : 'No Saved Game'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartScreen; 