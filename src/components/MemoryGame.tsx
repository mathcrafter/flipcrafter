'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { blockStore } from '@/stores/BlockStore';
import { pickaxeStore } from '@/stores/PickaxeStore';
import { GameState, CardType, GridSize } from '@/models/GameState';
import { saveGameState, loadGameState, GAME_STATE_KEY } from '@/controllers/GameController';

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState<CardType | null>(null);
    const [secondCard, setSecondCard] = useState<CardType | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [matches, setMatches] = useState(0);
    const [gridSize, setGridSize] = useState<GridSize>({ rows: 4, columns: 4 });
    const [showSettings, setShowSettings] = useState(false);
    const initialLoadAttempted = useRef(false);

    // Load saved game state on initial mount only
    useEffect(() => {
        // Skip during server-side rendering
        if (typeof window === 'undefined') return;

        const savedState = loadGameState();
        console.log('Loaded saved game state:', savedState);
        if (savedState) {
            // Restore saved game state
            setCards(savedState.cards);
            setMoves(savedState.moves);
            setMatches(savedState.matches);
            setGridSize(savedState.gridSize);
            setGameComplete(savedState.gameComplete);
            setFirstCard(null);
            setSecondCard(null);
            setDisabled(false);
        } else {
            // Start a new game if no saved state
            startGame();
        }
    }, []);  // Empty dependency array = run once on mount

    // Start new game when grid size changes (but not on initial mount)
    useEffect(() => {
        // Skip the first render since it's handled by the load state effect
        if (initialLoadAttempted.current) {
            startGame();
        }
        initialLoadAttempted.current = true;
    }, [gridSize]);

    const isGameComplete = (cards: CardType[]) => {
        if (cards.length > 0) {
            for (const card of cards) {
                if (!card.matched) {
                    return false;
                }
            }
        }
        return true;
    }

    // Check if game is complete
    useEffect(() => {
        if (isGameComplete(cards)) {
            setGameComplete(true);
            // Save when game is complete
            saveGameState(cards, moves, matches, gridSize, gameComplete);
        }
    }, [matches, cards]);

    // Save game state after each move or when game state changes
    useEffect(() => {
        if (cards.length > 0) {
            saveGameState(cards, moves, matches, gridSize, gameComplete);
        }
    }, [cards, moves, matches, gameComplete]);

    // Calculate total cards needed (must be even)
    const getTotalCards = (): number => {
        const total = gridSize.rows * gridSize.columns;
        return total % 2 === 0 ? total : total - 1; // Ensure even number
    };

    // Handle loading saved game
    const handleLoadGame = () => {
        const gameState = loadGameState();
        console.log('Loaded saved game state:', gameState);

        if (!gameState) {
            alert('No saved game found!');
            return;
        }

        setCards(gameState.cards);
        setMoves(gameState.moves);
        setMatches(gameState.matches);
        setGridSize(gameState.gridSize);
        setGameComplete(gameState.gameComplete);
        setFirstCard(null);
        setSecondCard(null);
        setDisabled(false);
    };

    // Shuffle cards for new game
    const startGame = () => {
        // Calculate how many pairs we need based on grid size
        const totalCards = getTotalCards();
        const pairsNeeded = totalCards / 2;

        // Get all blocks and pickaxes from stores
        const availableBlocks = blockStore.items;
        const availablePickaxes = pickaxeStore.items;

        // Determine how many of each type to use
        const pickaxeCount = Math.min(Math.ceil(pairsNeeded / 2), availablePickaxes.length);
        const blockCount = Math.min(pairsNeeded - pickaxeCount, availableBlocks.length);

        // If we don't have enough blocks and pickaxes, adjust the counts
        const adjustedPickaxeCount = pickaxeCount + Math.max(0, pairsNeeded - pickaxeCount - blockCount);

        // Shuffle and select random pickaxes and blocks
        const shuffledPickaxes = [...availablePickaxes]
            .sort(() => Math.random() - 0.5)
            .slice(0, adjustedPickaxeCount);

        const shuffledBlocks = [...availableBlocks]
            .sort(() => Math.random() - 0.5)
            .slice(0, blockCount);

        // Combine pickaxes and blocks
        const selectedItems = [
            ...shuffledPickaxes.map(pickaxe => ({
                type: 'pickaxe',
                name: pickaxe.name,
                rarity: pickaxe.rarity
            })),
            ...shuffledBlocks.map(block => ({
                type: 'block',
                name: block.name,
                rarity: block.rarity
            }))
        ];

        // Create pairs
        const cardPairs = [...selectedItems, ...selectedItems].map((item, index) => ({
            id: index,
            type: item.type,
            name: item.name,
            rarity: item.rarity,
            matched: false,
            flipped: false
        }));

        // Shuffle the pairs
        const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

        setCards(shuffledCards);
        setFirstCard(null);
        setSecondCard(null);
        setMoves(0);
        setMatches(0);
        setGameComplete(false);
    };

    // Handle grid size change
    const handleGridSizeChange = (dimension: 'rows' | 'columns', value: number) => {
        setGridSize(prev => ({
            ...prev,
            [dimension]: value
        }));
    };

    // Handle card click
    const handleCardClick = (card: CardType) => {
        if (disabled) return;

        // Prevent clicking the same card twice or already matched cards
        if (card.matched || card.flipped) return;

        // Update the card to be flipped
        setCards(prevCards =>
            prevCards.map(c =>
                c.id === card.id ? { ...c, flipped: true } : c
            )
        );

        // Set as first or second card
        if (!firstCard) {
            setFirstCard(card);
        } else if (!secondCard) {
            setSecondCard(card);
            setDisabled(true);
            setMoves(prev => prev + 1);
        }
    };

    // Check for match when both cards are flipped
    useEffect(() => {
        if (firstCard && secondCard) {
            // Check if they match (same type and name)
            const isMatch = firstCard.type === secondCard.type && firstCard.name === secondCard.name;

            if (isMatch) {
                // Mark cards as matched
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.id === firstCard.id || card.id === secondCard.id
                            ? { ...card, matched: true }
                            : card
                    )
                );
                setMatches(prev => prev + 1);
                resetTurn();
            } else {
                // Flip cards back after a delay
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.id === firstCard.id || card.id === secondCard.id
                                ? { ...card, flipped: false }
                                : card
                        )
                    );
                    resetTurn();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    // Reset turn
    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setDisabled(false);
    };

    return (
        <div>
            <div className="stats">
                <div>Moves: {moves}</div>
                <div>Matches: {matches} / {cards.length / 2}</div>
                <div className="buttons">
                    <button onClick={startGame}>New Game</button>
                    <button onClick={handleLoadGame}>Load Game</button>
                    <button onClick={() => setShowSettings(!showSettings)}>
                        {showSettings ? 'Hide Settings' : 'Grid Settings'}
                    </button>
                </div>
            </div>

            {showSettings && (
                <div className="settings-panel">
                    <div className="grid-settings">
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
                            <p>Total Cards: {getTotalCards()}</p>
                        </div>
                    </div>
                </div>
            )}

            <div
                className="memory-grid"
                style={{
                    gridTemplateColumns: `repeat(${gridSize.columns}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                }}
            >
                {cards.slice(0, getTotalCards()).map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>

            {gameComplete && (
                <div className="game-complete">
                    <h2>Game Complete!</h2>
                    <p>You completed the game in {moves} moves</p>
                </div>
            )}
        </div>
    );
};

export default MemoryGame; 