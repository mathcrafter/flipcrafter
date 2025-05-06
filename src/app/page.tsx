'use client';

import React, { useState, useEffect } from 'react';
import MemoryGame from '@/components/MemoryGame';

export default function Home() {
    return (
        <main className="container">
            <header>
                <h1>FlipCrafter</h1>
                <p className="subtitle">A memory game</p>
            </header>

            <section className="game-section">
                <MemoryGame />
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