'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import InteractiveHeart from './InteractiveHeart';
import { loveData } from '@/config/loveData';

interface WelcomeScreenProps {
  onUnlock: () => void;
}

export default function WelcomeScreen({ onUnlock }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 z-20 overflow-hidden"
    >
      {/* Background soft ambient watercolor halos for calm romantic atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-50/70 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-rose-50/80 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Festive Romantic Pill Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200/80 text-rose-800 text-xs tracking-widest uppercase mb-6 shadow-sm shadow-rose-900/5 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-semibold text-rose-900">Una sorpresa especial</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Elegant Framed Picture with the Name */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="relative group mb-8"
        >
          {/* Subtle soft glowing border */}
          <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 opacity-60 blur-md group-hover:opacity-90 transition duration-700 animate-pulse-slow" />

          {/* Picture Box */}
          <div className="relative rounded-[2.2rem] overflow-hidden border border-rose-100/80 bg-white p-2.5 shadow-xl shadow-rose-950/10">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[1.8rem] overflow-hidden bg-rose-50">
              <Image
                src={loveData.coverImage}
                alt={`Para ${loveData.recipientName}`}
                fill
                priority
                sizes="(max-width: 640px) 256px, 288px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Romantic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Name over the image */}
              <div className="absolute bottom-4 inset-x-0 px-4 flex flex-col items-center">
                <span className="text-amber-200/90 text-xs uppercase tracking-widest font-light mb-0.5">
                  PARA LA MEJOR DEL MUNDO
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-white drop-shadow-md">
                  {loveData.recipientName}
                </h1>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mt-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subtitle & Invitation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <p className="font-serif italic text-xl sm:text-2xl text-stone-800 max-w-sm mx-auto leading-relaxed">
            &ldquo;{loveData.subheading}&rdquo;
          </p>
          <p className="text-xs text-rose-700/80 uppercase tracking-widest mt-2 font-medium">
            Toca el corazón 3 veces para entrar a nuestra fiesta de amor
          </p>
        </motion.div>

        {/* The 3-Click Interactive Heart */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <InteractiveHeart onComplete={onUnlock} />
        </motion.div>

      </div>
    </motion.div>
  );
}
