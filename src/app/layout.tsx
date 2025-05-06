import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { getAssetPath } from '@/utils/assetPath';

export const metadata: Metadata = {
    title: 'FlipCrafter: Math Memory Game',
    description: 'A mathematical memory card game for all ages.',
    icons: {
        icon: getAssetPath('/favicon.ico'),
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#2a7ae2" />
                <link rel="apple-touch-icon" href={getAssetPath('/icons/apple-touch-icon.png')} />
            </head>
            <body>{children}</body>
        </html>
    );
} 