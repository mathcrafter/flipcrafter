'use client';

import React from 'react';
import { getAssetPath } from '@/utils/assetPath';

export type InventoryItem = {
    type: 'block' | 'pickaxe';
    name: string;
    rarity: string;
    count: number;
};

interface InventoryProps {
    items: InventoryItem[];
    onItemClick: (item: InventoryItem) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ items, onItemClick }) => {
    return (
        <div className="inventory-container">
            <h3 className="inventory-title">Inventory</h3>
            <div className="inventory-grid">
                {items.length === 0 ? (
                    <div className="empty-inventory">Collect items by matching cards!</div>
                ) : (
                    items.map((item) => (
                        <div
                            key={`${item.type}-${item.name}`}
                            className="inventory-slot"
                            onClick={() => onItemClick(item)}
                        >
                            <div className="inventory-item" data-rarity={item.rarity}>
                                <img
                                    src={getAssetPath(`/assets/${item.type}s/${item.name}.png`)}
                                    alt={item.name}
                                    className="inventory-image"
                                />
                                <span className="inventory-count">{item.count}</span>
                            </div>
                            <div className="inventory-name">{item.name.replace(/_/g, ' ')}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Inventory; 