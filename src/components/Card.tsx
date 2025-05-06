'use client';

import React, { useRef } from 'react';
import { getAssetPath } from '@/utils/assetPath';

interface CardProps {
    card: {
        id: number;
        type: string;
        name: string;
        matched: boolean;
        flipped: boolean;
        rarity: string;
    };
    onClick: (element: HTMLElement) => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
    console.log('Card:', card);
    const cardRef = useRef<HTMLDivElement>(null);

    const getImageSrc = () => {
        if (card.type === 'pickaxe') {
            return getAssetPath(`/assets/pickaxes/${card.name}.png`);
        } else {
            return getAssetPath(`/assets/blocks/${card.name}.png`);
        }
    };

    // Get color based on rarity (academic style)
    const getRarityColor = () => {
        switch (card.rarity) {
            case 'Common':
                return '#607d8b'; // Blue Grey
            case 'Uncommon':
                return '#4caf50'; // Green
            case 'Rare':
                return '#2196f3'; // Blue
            case 'Epic':
                return '#9c27b0'; // Purple
            case 'Legendary':
                return '#ff9800'; // Orange
            case 'Seasonal':
                return '#e91e63'; // Pink
            default:
                return '#607d8b'; // Blue Grey
        }
    };

    // Format the name for display (convert snake_case to Title Case)
    const getDisplayName = () => {
        return card.name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Sound effects
    const playFlipSound = () => {
        const audio = new Audio(getAssetPath('/assets/sounds/click.mp3'));
        audio.volume = 0.5;
        audio.play().catch(err => console.log('Audio play failed:', err));
    };

    const handleClick = () => {
        if (!card.matched && !card.flipped) {
            playFlipSound();
            if (cardRef.current) {
                onClick(cardRef.current);
            }
        }
    };

    return (
        <div
            ref={cardRef}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={handleClick}
            data-card-id={card.id}
        >
            <div className="card-inner">
                <div className="card-front">
                    <div className="question-mark">?</div>
                </div>
                <div className="card-back">
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