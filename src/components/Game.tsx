'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { blockStore } from '@/stores/BlockStore';
import { pickaxeStore } from '@/stores/PickaxeStore';
import { biomeStore } from '@/stores/BiomeStore';
import { CardType, GridSize } from '@/models/GameState';
import { saveGameState, loadGameState } from '@/controllers/GameController';
import SetupScreen from './SetupScreen';
import Inventory, { InventoryItem } from './Inventory';
import ItemAnimation from './ItemAnimation';

const Game: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState<CardType | null>(null);
    const [secondCard, setSecondCard] = useState<CardType | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [matches, setMatches] = useState(0);
    const [gridSize, setGridSize] = useState<GridSize>({ rows: 2, columns: 2 });
    const [showSetupScreen, setShowSetupScreen] = useState(true);
    const [hasSavedGame, setHasSavedGame] = useState(false);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [currentBiome, setCurrentBiome] = useState<string>('plains');
    const [animatingItem, setAnimatingItem] = useState<{
        type: 'block' | 'pickaxe',
        name: string,
        position: { x: number, y: number },
        targetPosition: { x: number, y: number }
    } | null>(null);

    const inventoryRef = useRef<HTMLDivElement>(null);

    // Check for saved game on initial mount only
    useEffect(() => {
        // Skip during server-side rendering
        if (typeof window === 'undefined') return;

        const savedState = loadGameState();
        console.log('Checking for saved game state:', savedState ? 'Found' : 'None');
        setHasSavedGame(savedState !== null);

        // Set current biome from saved state if it exists
        if (savedState?.currentBiome) {
            setCurrentBiome(savedState.currentBiome);
        }

        // Load saved inventory if it exists
        const savedInventory = localStorage.getItem('inventory');
        if (savedInventory) {
            try {
                setInventory(JSON.parse(savedInventory));
            } catch (e) {
                console.error('Failed to parse saved inventory', e);
                setInventory([]);
            }
        }
    }, []);  // Empty dependency array = run once on mount

    // Save inventory when it changes
    useEffect(() => {
        if (inventory.length > 0) {
            localStorage.setItem('inventory', JSON.stringify(inventory));
        }
    }, [inventory]);

    const isGameComplete = (cards: CardType[]) => {
        for (const card of cards) {
            if (!card.matched) {
                return false;
            }
        }
        return true;
    }

    // Check if game is complete
    useEffect(() => {
        if (cards.length > 0 && isGameComplete(cards)) {
            setGameComplete(true);
            // Save when game is complete
            saveGameState(cards, moves, matches, gridSize, gameComplete, currentBiome);
        }
    }, [matches, cards, currentBiome]);

    // Save game state after each move or when game state changes
    useEffect(() => {
        if (cards.length > 0) {
            saveGameState(cards, moves, matches, gridSize, gameComplete, currentBiome);
        }
    }, [cards, moves, matches, gameComplete, currentBiome]);

    // Calculate total cards needed (must be even)
    const getTotalCards = (): number => {
        const total = gridSize.rows * gridSize.columns;
        return total % 2 === 0 ? total : total - 1; // Ensure even number
    };

    // Shuffle cards for new game
    const resetGame = () => {
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

    // Change the current biome
    const changeBiome = (biomeName: string) => {
        if (biomeStore.map.has(biomeName)) {
            setCurrentBiome(biomeName);
        }
    };

    // Handle user starting a new game from setup screen
    const handleStartNewGame = () => {
        resetGame();
        setShowSetupScreen(false);
    };

    // Handle user continuing a saved game
    const handleContinueSavedGame = () => {
        const savedState = loadGameState();
        if (savedState) {
            setCards(savedState.cards);
            setMoves(savedState.moves);
            setMatches(savedState.matches);
            setGridSize(savedState.gridSize);
            setGameComplete(savedState.gameComplete);
            setCurrentBiome(savedState.currentBiome || 'plains');
            setFirstCard(null);
            setSecondCard(null);
            setDisabled(false);
        }
        setShowSetupScreen(false);
    };

    // Handle returning to setup screen
    const handleReturnToSetup = () => {
        setShowSetupScreen(true);
    };

    // Handle grid size change
    const handleGridSizeChange = (dimension: 'rows' | 'columns', value: number) => {
        setGridSize(prev => ({
            ...prev,
            [dimension]: value
        }));
    };

    // Add item to inventory
    const addItemToInventory = (type: 'block' | 'pickaxe', name: string, rarity: string) => {
        setInventory(prev => {
            const existingItem = prev.find(item => item.type === type && item.name === name);
            if (existingItem) {
                // Item already exists, increment count
                return prev.map(item =>
                    item.type === type && item.name === name
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            } else {
                // New item, add to inventory
                return [...prev, { type, name, rarity, count: 1 }];
            }
        });
    };

    // Handle animation completion
    const handleAnimationComplete = () => {
        if (animatingItem) {
            // Add the item to inventory
            addItemToInventory(
                animatingItem.type,
                animatingItem.name,
                firstCard?.rarity || 'common'
            );
            // Clear animation state
            setAnimatingItem(null);
        }
    };

    // Start animation for collected item
    const animateItemCollection = (cardElement: HTMLElement, item: { type: 'block' | 'pickaxe', name: string }) => {
        // Get card position
        const cardRect = cardElement.getBoundingClientRect();
        const cardPosition = {
            x: cardRect.left + (cardRect.width / 2),
            y: cardRect.top + (cardRect.height / 2)
        };

        // Get inventory position (center of first inventory item or center of inventory)
        const inventoryRect = inventoryRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const targetPosition = {
            x: inventoryRect.left + (inventoryRect.width / 2),
            y: inventoryRect.top + (inventoryRect.height / 2)
        };

        // Set animating item state to trigger animation
        setAnimatingItem({
            type: item.type,
            name: item.name,
            position: cardPosition,
            targetPosition
        });
    };

    // Handle card click
    const handleCardClick = (card: CardType, cardElement: HTMLElement) => {
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

                // Get the card element to animate from
                const cardElements = document.querySelectorAll('.card');
                const matchedCardElement = Array.from(cardElements).find(el =>
                    el.getAttribute('data-card-id') === firstCard.id.toString()
                ) as HTMLElement;

                if (matchedCardElement) {
                    // Animate item collection
                    setTimeout(() => {
                        animateItemCollection(matchedCardElement, {
                            type: firstCard.type as 'block' | 'pickaxe',
                            name: firstCard.name
                        });
                    }, 500); // Small delay to let the match be visible
                } else {
                    // If we can't find the element, just add to inventory
                    addItemToInventory(
                        firstCard.type as 'block' | 'pickaxe',
                        firstCard.name,
                        firstCard.rarity
                    );
                }

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
        <div className="game-container">
            {showSetupScreen ? (
                <SetupScreen
                    gridSize={gridSize}
                    onGridSizeChange={handleGridSizeChange}
                    onStartNewGame={handleStartNewGame}
                    onContinueSavedGame={handleContinueSavedGame}
                    hasSavedGame={hasSavedGame}
                    getTotalCards={getTotalCards}
                />
            ) : (
                <>
                    <div className="stats">
                        <div>Moves: {moves}</div>
                        <div>Matches: {matches} / {cards.length / 2}</div>
                        <div className="buttons">
                            <button onClick={resetGame}>Reset</button>
                            <button onClick={handleReturnToSetup}>Back to Menu</button>
                        </div>
                    </div>

                    <div className="biome-info my-2 text-center">
                        <p>Current Biome: <strong className="capitalize">{currentBiome.replace('_', ' ')}</strong></p>
                    </div>

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
                                biome={currentBiome}
                                onClick={(cardElement) => handleCardClick(card, cardElement)}
                            />
                        ))}
                    </div>

                    <div className="inventory-wrapper" ref={inventoryRef}>
                        <Inventory items={inventory} />
                    </div>

                    {/* Animation overlay */}
                    {animatingItem && (
                        <ItemAnimation
                            type={animatingItem.type}
                            name={animatingItem.name}
                            position={animatingItem.position}
                            targetPosition={animatingItem.targetPosition}
                            onAnimationComplete={handleAnimationComplete}
                        />
                    )}

                    {gameComplete && (
                        <div className="game-complete">
                            <h2>Game Complete!</h2>
                            <p>You completed the game in {moves} moves</p>
                            <p>You collected {inventory.reduce((total, item) => total + item.count, 0)} items!</p>
                            <button onClick={handleReturnToSetup}>Back to Menu</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Game; 