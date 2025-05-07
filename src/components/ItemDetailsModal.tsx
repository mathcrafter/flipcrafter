'use client';

import React from 'react';
import { getAssetPath } from '@/utils/assetPath';
import { blockStore } from '@/stores/BlockStore';
import { pickaxeStore } from '@/stores/PickaxeStore';
import { InventoryItem } from './Inventory';
import { biomeStore } from '@/stores/BiomeStore';
import { Block } from '@/models/Block';

interface ItemDetailsModalProps {
    item: InventoryItem | null;
    onClose: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose }) => {
    if (!item) return null;

    const getItemDetails = () => {
        if (item.type === 'block') {
            const blockDetails = blockStore.getItemByName(item.name);
            return blockDetails;
        } else if (item.type === 'pickaxe') {
            const pickaxeDetails = pickaxeStore.getItemByName(item.name);
            return pickaxeDetails;
        }
        return null;
    };

    const details = getItemDetails();
    const formattedName = item.name.replace(/_/g, ' ');

    const getRarityColor = (rarity: string) => {
        switch (rarity.toLowerCase()) {
            case 'common': return '#607D8B';
            case 'uncommon': return '#4CAF50';
            case 'rare': return '#2196F3';
            case 'epic': return '#9C27B0';
            case 'legendary': return '#FF9800';
            case 'seasonal': return '#E91E63';
            default: return '#607D8B';
        }
    };

    return (
        <div className="item-details-overlay" onClick={onClose}>
            <div className="item-details-modal" onClick={e => e.stopPropagation()}>
                <div className="item-details-header">
                    <h2 className="capitalize">{formattedName}</h2>
                    <button className="close-details-button" onClick={onClose}>×</button>
                </div>
                <div className="item-details-content">
                    <div className="item-image-container">
                        <img
                            src={getAssetPath(`/assets/${item.type}s/${item.name}.png`)}
                            alt={formattedName}
                            className="item-details-image"
                        />
                    </div>
                    <div className="item-info">
                        <div className="item-rarity" style={{ backgroundColor: getRarityColor(item.rarity) }}>
                            {item.rarity}
                        </div>
                        <div className="item-count">
                            Quantity: <strong>{item.count}</strong>
                        </div>

                        {item.type === 'block' && details && (
                            <div className="block-stats">
                                <p className="block-description">
                                    This is a <span className="capitalize">{item.rarity.toLowerCase()}</span> rarity block that can be found in certain biomes.
                                </p>
                                <p className="block-usage">
                                    Blocks can be used for crafting and may be required to unlock certain biomes.
                                </p>
                            </div>
                        )}

                        {item.type === 'pickaxe' && details && (
                            <div className="pickaxe-stats">
                                <div className="stat-row">
                                    <span className="stat-label">Strength:</span>
                                    <span className="stat-value">{(details as any).strength}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Critical:</span>
                                    <span className="stat-value">{(details as any).critical * 100}%</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Power:</span>
                                    <span className="stat-value">{(details as any).power}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Max Health:</span>
                                    <span className="stat-value">{(details as any).maxHealth}</span>
                                </div>
                                {(details as any).description && (
                                    <div className="pickaxe-description">
                                        "{(details as any).description}"
                                    </div>
                                )}
                                {(details as any).notes && (
                                    <div className="pickaxe-notes">
                                        Note: {(details as any).notes}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="item-availability">
                            <h3>Available in Biomes:</h3>
                            <div className="biome-availability">
                                {item.type === 'block' &&
                                    biomeStore.items
                                        .filter(biome => biome.availableBlocks.includes(item.name))
                                        .map(biome => (
                                            <div key={biome.name} className="biome-tag capitalize">
                                                {biome.name.replace(/_/g, ' ')}
                                            </div>
                                        ))
                                }
                                {item.type === 'pickaxe' &&
                                    biomeStore.items
                                        .filter(biome => biome.availablePickaxes.includes(item.name))
                                        .map(biome => (
                                            <div key={biome.name} className="biome-tag capitalize">
                                                {biome.name.replace(/_/g, ' ')}
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsModal; 