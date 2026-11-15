'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveHeartProps {
  onComplete: () => void;
}

interface FloatingClickHeart {
  id: number;
  x: number;
  y: number;
}

export default function InteractiveHeart({ onComplete }: InteractiveHeartProps) {
  const [clicks, setClicks] = useState<number>(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingClickHeart[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const triggerConfetti = () => {
    // Launch festive heart and golden sparkles confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#e11d48', '#fda4af', '#fb7185', '#facc15', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#be123c', '#f43f5e', '#eab308'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#be123c', '#f43f5e', '#eab308'],
      });
    }, 250);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCompleted) return;

    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    // Add floating hearts effect at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart: FloatingClickHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setFloatingHearts((prev) => [...prev.slice(-8), newHeart]);

    // Fill logic
    if (nextClicks >= 3) {
      setIsCompleted(true);
      triggerConfetti();
      // Allow user to witness the 100% full glowing heart and confetti before opening
      setTimeout(() => {
        onComplete();
      }, 1300);
    }
  };

  // Percentage filled: 0%, 33.3%, 66.6%, 100%
  const fillPercentage = Math.min(100, Math.round((clicks / 3) * 100));

  // Pulse speed based on fill level
  const pulseClass =
    clicks === 0
      ? 'hover:scale-105'
      : clicks === 1
      ? 'animate-pulse'
      : clicks === 2
      ? 'heart-beating'
      : 'scale-110';

  return (
    <div className="flex flex-col items-center justify-center select-none relative">
      {/* Heart button container */}
      <div
        onClick={handleClick}
        className={`relative cursor-pointer transition-transform duration-300 ${pulseClass}`}
        style={{ width: '180px', height: '170px' }}
        title="Toca para llenar el corazón"
      >
        {/* Glow behind the heart that gets stronger as it fills */}
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            background:
              clicks === 0
                ? 'transparent'
                : clicks === 1
                ? 'radial-gradient(circle, rgba(225,29,72,0.3) 0%, transparent 70%)'
                : clicks === 2
                ? 'radial-gradient(circle, rgba(225,29,72,0.5) 0%, rgba(244,63,94,0.3) 50%, transparent 80%)'
                : 'radial-gradient(circle, rgba(225,29,72,0.8) 0%, rgba(250,204,21,0.5) 60%, transparent 90%)',
          }}
        />

        {/* Heart SVG with white background, red border, and bottom-to-top red fill */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full drop-shadow-[0_12px_28px_rgba(225,29,72,0.2)]"
        >
          <defs>
            <linearGradient id="heartRedGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#9f1239" />
              <stop offset="40%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            {/* Clip path defining the fill level from bottom (y=24) to top (y=0) */}
            <clipPath id="fillClip">
              <rect
                x="0"
                y={24 - (fillPercentage / 100) * 24}
                width="24"
                height={(fillPercentage / 100) * 24}
                style={{
                  transition: 'y 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
            </clipPath>
          </defs>

          {/* 1. Base Heart: White background inside */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ffffff"
          />

          {/* 2. Red Fill (grows with clicks) */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#heartRedGradient)"
            clipPath="url(#fillClip)"
          />

          {/* 3. Red Border (Bordes rojos definidos y elegantes) */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="#e11d48"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>

        {/* Floating click hearts */}
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.span
              key={h.id}
              initial={{ opacity: 1, scale: 0.6, y: 0 }}
              animate={{ opacity: 0, scale: 1.4, y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute pointer-events-none text-xl"
              style={{ left: h.x, top: h.y }}
            >
              💖
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress indicators & romantic guidance */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2.5">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-500 ${
                clicks >= step
                  ? 'w-8 bg-gradient-to-r from-rose-500 to-amber-500 shadow-md shadow-rose-500/25'
                  : 'w-2 bg-rose-100 border border-rose-200'
              }`}
            />
          ))}
        </div>

        <p className="text-sm font-medium tracking-wide text-stone-600 text-center transition-all duration-300">
          {clicks === 0 && (
            <span className="flex items-center gap-1.5 animate-pulse text-stone-700">
              <span>Haz clic en el corazón para llenarlo</span>
              <span className="text-rose-600 font-bold">(0/3)</span>
            </span>
          )}
          {clicks === 1 && (
            <span className="flex items-center gap-1.5 text-rose-700">
              <span>¡Comienza a latir! Haz clic otra vez</span>
              <span className="text-rose-600 font-bold">(1/3)</span>
            </span>
          )}
          {clicks === 2 && (
            <span className="flex items-center gap-1.5 text-amber-800 font-medium">
              <span>¡Un latido más para abrir mi sorpresa!</span>
              <span className="text-amber-600 font-bold">(2/3)</span>
            </span>
          )}
          {clicks >= 3 && (
            <span className="flex items-center gap-1.5 text-rose-700 font-semibold text-base animate-bounce">
              <span>¡Lleno de amor para ti! Abriendo...</span>
              <span>✨🥂</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

