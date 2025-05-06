'use client';

import React, { useState, useEffect } from 'react';
import MemoryGame from '@/components/MemoryGame';

export default function Home() {
    return (
        <main className="container">
            <h1>FlipCrafter Memory Game</h1>
            <MemoryGame />
        </main>
    );
} 