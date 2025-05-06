'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { biomeStore } from '@/stores/BiomeStore';
import { Biome } from '@/models/Biome';

interface BiomeSelectorProps {
    unlockedBiomes: string[];
    currentBiome: string;
    onSelectBiome: (biomeName: string) => void;
    onClose: () => void;
}

const BiomeSelector: React.FC<BiomeSelectorProps> = ({
    unlockedBiomes,
    currentBiome,
    onSelectBiome,
    onClose
}) => {
    const [selectedBiome, setSelectedBiome] = useState(currentBiome);

    const handleBiomeSelect = (biomeName: string) => {
        setSelectedBiome(biomeName);
    };

    const handleConfirm = () => {
        onSelectBiome(selectedBiome);
        onClose();
    };

    // Get the biome objects from the store
    const availableBiomes = unlockedBiomes
        .map(name => biomeStore.getItemByName(name))
        .filter(biome => biome) as Biome[];

    return (
        <div className="biome-selector-overlay">
            <div className="biome-selector-modal">
                <div className="biome-selector-header">
                    <h2>Select Biome</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="biome-grid">
                    {availableBiomes.map(biome => (
                        <div
                            key={biome.name}
                            className={`biome-option ${selectedBiome === biome.name ? 'selected' : ''}`}
                            onClick={() => handleBiomeSelect(biome.name)}
                        >
                            <div className="biome-image-container">
                                <Image
                                    src={`/assets/biomes/${biome.name}.png`}
                                    alt={biome.description}
                                    width={160}
                                    height={100}
                                    className="biome-image"
                                />
                            </div>
                            <div className="biome-name capitalize">{biome.name.replace(/_/g, ' ')}</div>
                        </div>
                    ))}
                </div>

                <div className="biome-selector-footer">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button
                        className="confirm-button"
                        onClick={handleConfirm}
                        disabled={selectedBiome === currentBiome}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BiomeSelector; 