'use client';

import { getAssetPath } from '@/utils/assetPath';
import React, { useEffect, useState } from 'react';

interface AnimatedItemProps {
    type: 'block' | 'pickaxe';
    name: string;
    position: { x: number, y: number };
    targetPosition: { x: number, y: number };
    onAnimationComplete: () => void;
}

const ItemAnimation: React.FC<AnimatedItemProps> = ({
    type,
    name,
    position,
    targetPosition,
    onAnimationComplete
}) => {
    const [currentPosition, setCurrentPosition] = useState(position);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        // Slight delay before starting animation
        const startTimeout = setTimeout(() => {
            setAnimationStarted(true);

            // Set the final position after the animation duration
            const animationDuration = 600; // Should match the CSS animation duration
            const completeTimeout = setTimeout(() => {
                onAnimationComplete();
            }, animationDuration);

            return () => clearTimeout(completeTimeout);
        }, 100);

        return () => clearTimeout(startTimeout);
    }, [targetPosition, onAnimationComplete]);

    return (
        <div
            className={`item-animation ${animationStarted ? 'animating' : ''}`}
            style={{
                left: position.x,
                top: position.y,
                '--target-x': `${targetPosition.x}px`,
                '--target-y': `${targetPosition.y}px`
            } as React.CSSProperties}
        >
            <img
                src={getAssetPath(`/assets/${type}s/${name}.png`)}
                alt={name}
                className="animated-item-image"
            />
        </div>
    );
};

export default ItemAnimation; 