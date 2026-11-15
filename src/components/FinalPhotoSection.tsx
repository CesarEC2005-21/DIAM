'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { loveData } from '@/config/loveData';

export default function FinalPhotoSection() {
  const { finalPhoto, recipientName } = loveData;

  const triggerCelebration = () => {
    // Multi-stage grand celebration confetti
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#e11d48', '#f43f5e', '#fb7185', '#facc15', '#fef08a', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-200/90 text-amber-800 text-xs tracking-widest uppercase mb-4 shadow-sm shadow-stone-900/5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span className="font-medium">Nuestro Gran Brindis</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mb-3 tracking-wide">
        {finalPhoto.title}
      </h2>
      <p className="font-serif italic text-stone-600 text-lg sm:text-xl max-w-xl mx-auto mb-10">
        &ldquo;{finalPhoto.description}&rdquo;
      </p>

      {/* Grand Framed Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative group mx-auto mb-12"
      >
        {/* Soft Gold & Rose Frame Glow */}
        <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 opacity-60 blur-xl group-hover:opacity-90 transition duration-700 animate-pulse-slow" />

        <div className="relative rounded-[2.2rem] p-3 sm:p-5 bg-white border border-amber-200/90 shadow-xl shadow-rose-950/10">
          <div className="relative aspect-[3/4] w-full max-w-md sm:max-w-lg mx-auto rounded-[1.8rem] overflow-hidden shadow-md bg-stone-100">
            <Image
              src={finalPhoto.url}
              alt={finalPhoto.title}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover object-center"
            />

            {/* Subtle romantic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

            <div className="absolute bottom-6 inset-x-0 px-6 flex flex-col items-center">
              <span className="font-script text-3xl sm:text-5xl text-amber-200 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                Diana & César
              </span>
              <p className="text-xs uppercase tracking-widest text-rose-100/90 mt-1 font-semibold">
                Por siempre juntos en cada aventura
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Celebration Confetti Button */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={triggerCelebration}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white font-serif text-xl font-bold tracking-wider shadow-xl shadow-rose-600/25 hover:shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-200/40"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🥂</span>
          <span>¡Celebrar Nuestro Amor!</span>
          <Sparkles className="w-5 h-5 text-amber-200 animate-bounce" />
        </button>
        <span className="text-xs text-stone-500 uppercase tracking-widest font-medium">
          Toca para encender la fiesta de confeti
        </span>
      </div>

      {/* Footer message */}
      <div className="mt-20 pt-10 border-t border-rose-100 text-center">
        <p className="font-script text-4xl text-rose-600 mb-2">
          Te amo hoy, mañana y siempre
        </p>
        <p className="text-xs text-stone-400 uppercase tracking-widest">
          Hecho con amor eterno para {recipientName}
        </p>
      </div>
    </section>
  );
}

