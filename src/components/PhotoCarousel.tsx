'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Heart } from 'lucide-react';
import { loveData } from '@/config/loveData';

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const photos = loveData.albumPhotos;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, photos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-rose-200/90 text-rose-800 text-xs tracking-widest uppercase mb-3 shadow-sm shadow-rose-950/5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-medium">Álbum de Recuerdos Inolvidables</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-wide">
          Una parte de nuestra historia
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-serif italic mt-2">
          Cada fotografía guarda un latido, una risa y una fiesta
        </p>
      </div>

      {/* Main Carousel Card on Calm White Backdrop */}
      <div className="relative bg-white/95 rounded-3xl p-3 sm:p-6 border border-rose-100 shadow-xl shadow-rose-950/5 backdrop-blur-xl">
        {/* Subtle glow ambient */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-200/30 via-amber-100/30 to-rose-200/30 blur-xl pointer-events-none" />

        <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              {/* Blurred backdrop to fill the frame and avoid awkward cropping */}
              <Image
                src={currentPhoto.url}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover blur-2xl scale-110 opacity-40"
              />

              <Image
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
              />

              {/* Gradient overlay for caption legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Photo Caption & Badge */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white flex flex-col justify-end">
                {currentPhoto.date && (
                  <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-medium uppercase tracking-wider mb-2">
                    <Heart className="w-3 h-3 fill-rose-300 text-rose-300" />
                    {currentPhoto.date}
                  </span>
                )}
                <h3 className="font-serif text-xl sm:text-3xl font-semibold leading-snug drop-shadow-md text-white">
                  {currentPhoto.caption}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-rose-100 text-stone-800 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 group shadow-md"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6 text-stone-700 group-hover:text-rose-600 transition-colors" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-rose-100 text-stone-800 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 group shadow-md"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6 text-stone-700 group-hover:text-rose-600 transition-colors" />
          </button>
        </div>

        {/* Carousel Bottom Bar: Indicators & Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-7 h-2 bg-gradient-to-r from-rose-500 to-amber-500 shadow-sm shadow-rose-500/20'
                    : 'w-2 h-2 bg-stone-200 hover:bg-stone-300'
                }`}
                aria-label={`Ir a la foto ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter and Play/Pause */}
          <div className="flex items-center gap-3 text-xs text-stone-600">
            <span className="font-mono font-medium">
              {currentIndex + 1} / {photos.length}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200/80 text-rose-900 transition-all font-medium"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-rose-600" />
                  <span>Pausar carrusel</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-amber-600" />
                  <span>Reproducir</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Small thumbnail previews below */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 border ${
                index === currentIndex
                  ? 'border-rose-500 ring-2 ring-rose-400 scale-105 shadow-md shadow-rose-500/20'
                  : 'border-stone-200 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
