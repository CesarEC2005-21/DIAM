'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import MainLoveExperience from '@/components/MainLoveExperience';
import FloatingParticles from '@/components/FloatingParticles';
import AudioPlayer from '@/components/AudioPlayer';
import { loveData } from '@/config/loveData';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'story'>('welcome');
  const [startMusic, setStartMusic] = useState<boolean>(true);

  const handleUnlock = () => {
    setCurrentPage('story');
    setStartMusic(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentPage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#fbf9f7] text-stone-800 overflow-x-hidden">
      {/* Ambient floating hearts and golden party sparkles */}
      <FloatingParticles />

      {/* Background audio player (selector de canciones + controles) */}
      <AudioPlayer songs={loveData.songs} autoPlay={startMusic} />

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' ? (
          <WelcomeScreen key="welcome" onUnlock={handleUnlock} />
        ) : (
          <MainLoveExperience key="story" onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </main>
  );
}

