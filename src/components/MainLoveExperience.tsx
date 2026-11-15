'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, RotateCcw } from 'lucide-react';
import PhotoCarousel from './PhotoCarousel';
import LoveLetter from './LoveLetter';
import FinalPhotoSection from './FinalPhotoSection';
import { loveData } from '@/config/loveData';

interface MainLoveExperienceProps {
  onRestart: () => void;
}

export default function MainLoveExperience({ onRestart }: MainLoveExperienceProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative w-full min-h-screen z-20 flex flex-col items-center pb-24 sm:pb-0"
    >
      {/* Hero Welcome for Page 2 */}
      <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        {/* Soft calm ambient background watercolor effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-rose-100/50 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-amber-50/70 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-2xl mx-auto flex flex-col items-center z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 p-0.5 shadow-lg shadow-rose-500/15 mb-6 flex items-center justify-center animate-bounce"
          >
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </div>
          </motion.div>

          <span className="text-amber-800 font-mono text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Nuestra Fiesta de Amor
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
            Para ti, mi loca{' '}
            <span className="font-script text-5xl sm:text-7xl md:text-8xl text-romantic-gradient block mt-2 leading-[1.35] pb-3 px-2 overflow-visible">
              {loveData.recipientName}
            </span>
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-stone-700 leading-relaxed max-w-xl mx-auto mb-10">
            &ldquo;El amor es el motivo, y cada segundo contigo es la mejor fiesta que existe.&rdquo;
          </p>

          <button
            onClick={scrollToContent}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-rose-50/80 border border-rose-200/90 text-rose-900 text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md shadow-stone-900/5"
          >
            <span className="font-medium">Ver nuestro álbum y carta</span>
            <ChevronDown className="w-4 h-4 text-amber-600 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 1. Photo Carousel Album */}
      <PhotoCarousel />

      {/* 2. Love Letter */}
      <LoveLetter />

      {/* 3. Final Photo Showcase */}
      <FinalPhotoSection />

      {/* Bottom corner restart button */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-rose-200 text-rose-800 text-xs transition-all hover:scale-105 shadow-md shadow-stone-900/5"
          title="Volver a la portada"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
          <span className="hidden sm:inline font-medium">Volver a la portada</span>
        </button>
      </div>
    </motion.div>
  );
}
