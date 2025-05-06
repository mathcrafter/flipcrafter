'use client';

import React, { useState, useEffect } from 'react';
import MemoryGame from '@/components/MemoryGame';
import StartScreen from '@/components/StartScreen';
import { GridSize } from '@/models/GameState';
import { loadGameState } from '@/controllers/GameController';

export default function Home() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gridSize, setGridSize] = useState<GridSize>({ rows: 4, columns: 4 });
    const [isLoadingGame, setIsLoadingGame] = useState(false);

    const handleStartNewGame = (selectedGridSize: GridSize) => {
        setGridSize(selectedGridSize);
        setIsLoadingGame(false);
        setGameStarted(true);
    };

    const handleLoadGame = () => {
        setIsLoadingGame(true);
        setGameStarted(true);
    };

    const handleBackToMenu = () => {
        setGameStarted(false);
    };

    return (
        <main className="container">
            <header>
                <h1>FlipCrafter</h1>
                <p className="subtitle">A memory game</p>
            </header>

            <section className="game-section">
                {gameStarted ? (
                    <>
                        <div className="game-controls">
                            <button onClick={handleBackToMenu} className="back-button">
                                ← Back to Menu
                            </button>
                        </div>
                        <MemoryGame
                            initialGridSize={gridSize}
                            shouldLoadGame={isLoadingGame}
                        />
                    </>
                ) : (
                    <StartScreen
                        onStartNewGame={handleStartNewGame}
                        onLoadGame={handleLoadGame}
                    />
                )}
            </section>

            <footer>
                <p>Match pairs of cards to win. The fewer moves, the better your score!</p>
                <div className="footer-links">
                    <a href="https://github.com/mathcrafter/flipcrafter" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span className="separator">•</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('© 2025 FlipCrafter') }}>About</a>
                </div>
            </footer>
        </main>
    );
} 