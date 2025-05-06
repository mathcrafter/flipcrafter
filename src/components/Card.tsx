'use client';

import React from 'react';

interface CardProps {
    card: {
        id: number;
        type: string;
        name: string;
        matched: boolean;
        flipped: boolean;
        rarity: string;
    };
    onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
    const getImageSrc = () => {
        if (card.type === 'pickaxe') {
            return `/assets/pickaxes/${card.name}.png`;
        } else {
            return `/assets/blocks/${card.name}.png`;
        }
    };

    // Get color based on rarity
    const getRarityColor = () => {
        switch (card.rarity) {
            case 'Common':
                return '#9e9e9e';
            case 'Uncommon':
                return '#4caf50';
            case 'Rare':
                return '#2196f3';
            case 'Epic':
                return '#9c27b0';
            case 'Legendary':
                return '#ff9800';
            case 'Seasonal':
                return '#e91e63';
            default:
                return '#9e9e9e';
        }
    };

    // Format the name for display (convert snake_case to Title Case)
    const getDisplayName = () => {
        return card.name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card-inner">
                <div className="card-front">
                    ?
                </div>
                <div
                    className="card-back"
                    style={{ borderColor: getRarityColor(), borderWidth: '2px', borderStyle: 'solid' }}
                >
                    <img src={getImageSrc()} alt={card.name} />
                    <div
                        className="card-rarity"
                        style={{ backgroundColor: getRarityColor() }}
                    >
                        {card.rarity}
                    </div>
                    <div className="card-name">{getDisplayName()}</div>
                </div>
            </div>
        </div>
    );
}; 