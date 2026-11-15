'use client';

import React, { useEffect, useState } from 'react';

interface ParticleItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'gold-dot';
  opacity: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<ParticleItem[]>([]);

  useEffect(() => {
    // Generate 28 calm romantic & festive particles
    const items: ParticleItem[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage across screen
      size: Math.floor(Math.random() * 14) + 10,
      duration: Math.floor(Math.random() * 12) + 14, // slow and calm float
      delay: Math.random() * 10,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'gold-dot',
      opacity: Math.random() * 0.35 + 0.2, // soft serene opacity
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle select-none"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            fontSize: `${p.size}px`,
          }}
        >
          {p.type === 'heart' && '💖'}
          {p.type === 'sparkle' && '✨'}
          {p.type === 'gold-dot' && (
            <span
              className="inline-block rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 shadow-lg shadow-amber-500/50"
              style={{ width: `${Math.max(4, p.size / 2.5)}px`, height: `${Math.max(4, p.size / 2.5)}px` }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

