'use client';

import React from 'react';
import Image from 'next/image';
import { biomeStore } from '@/stores/BiomeStore';
import { getAssetPath } from '@/utils/assetPath';

interface BiomeDisplayProps {
    currentBiome: string;
    className?: string;
}

const BiomeDisplay: React.FC<BiomeDisplayProps> = ({ currentBiome, className = '' }) => {
    const biomeImagePath = getAssetPath(`/assets/biomes/${currentBiome}.png`);
    const biome = biomeStore.getItemByName(currentBiome);

    return (
        <div className={`biome-display ${className}`}>
            <div className="biome-image-container relative w-64 h-40 overflow-hidden rounded-lg shadow-md">
                <Image
                    src={biomeImagePath}
                    alt={biome?.description || `${currentBiome} biome`}
                    width={256}
                    height={160}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="biome-info mt-2 text-center">
                <h3 className="text-xl font-bold capitalize">{currentBiome.replace('_', ' ')}</h3>
                {biome && <p className="text-sm opacity-75">{biome.description}</p>}
            </div>
        </div>
    );
};

export default BiomeDisplay; 