'use client';

import React, { useState, useEffect } from 'react';
import Game from '@/components/Game';

export default function Home() {
    return (
        <main className="container">
            <section className="game-section">
                <Game />
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