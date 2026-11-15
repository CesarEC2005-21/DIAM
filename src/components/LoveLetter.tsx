'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveData } from '@/config/loveData';

export default function LoveLetter() {
  const { letter, recipientName } = loveData;

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-16 sm:py-24">
      {/* Background glow behind letter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gradient-to-r from-rose-100/60 via-amber-100/40 to-rose-100/60 blur-[110px] pointer-events-none" />

      {/* Decorative intro badge */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200/90 text-rose-800 text-xs tracking-widest uppercase shadow-sm shadow-rose-950/5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-medium">Palabras Escritas Desde el Alma</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>
      </div>

      {/* Parchment Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="relative parchment-bg text-amber-950 rounded-[2rem] p-8 sm:p-14 border-2 border-amber-200/80 shadow-[0_25px_60px_-15px_rgba(120,53,15,0.12)] overflow-hidden"
      >
        {/* Vintage corner accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-800/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-800/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-800/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-800/40 rounded-br-xl pointer-events-none" />

        {/* Wax Seal Embellishment */}
        <div className="flex justify-center -mt-4 mb-8">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 shadow-xl border-2 border-amber-400/60 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
            <span className="font-serif font-black text-amber-200 text-xl tracking-wider select-none">
              {recipientName.charAt(0)}
            </span>
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/40 pointer-events-none" />
          </div>
        </div>

        {/* Letter Date */}
        <div className="text-right text-xs uppercase tracking-widest text-amber-900/70 font-medium mb-6 font-serif">
          {letter.date}
        </div>

        {/* Letter Title */}
        <h2 className="font-serif text-3xl sm:text-4xl text-center font-bold text-amber-950 mb-3 tracking-wide">
          {letter.title}
        </h2>

        {/* Elegant filigree line */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="w-16 h-px bg-amber-800/30" />
          <Heart className="w-4 h-4 text-rose-700 fill-rose-700" />
          <div className="w-16 h-px bg-amber-800/30" />
        </div>

        {/* Salutation */}
        <h3 className="font-serif text-2xl font-semibold text-rose-900 mb-6 italic">
          {letter.salutation}
        </h3>

        {/* Letter Body Paragraphs */}
        <div className="space-y-6 text-amber-950/90 font-serif text-lg sm:text-xl leading-relaxed text-justify">
          {letter.paragraphs.map((paragraph, index) => (
            <p key={index} className="relative">
              {index === 0 && (
                <span className="float-left font-serif text-6xl leading-[0.8] pr-3 pt-1 font-bold text-rose-800">
                  {paragraph.charAt(0)}
                </span>
              )}
              {index === 0 ? paragraph.slice(1) : paragraph}
            </p>
          ))}
        </div>

        {/* Closing & Signature */}
        <div className="mt-12 pt-8 border-t border-amber-900/20 flex flex-col items-end">
          <p className="font-serif italic text-lg text-amber-900/80 mb-2">
            {letter.closing}
          </p>
          <p className="font-script text-4xl sm:text-5xl text-rose-800 drop-shadow-sm">
            {letter.signature}
          </p>
        </div>

        {/* Subtle festive champagne watermark icon */}
        <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none">
          <Heart className="w-48 h-48 fill-rose-900" />
        </div>
      </motion.div>
    </section>
  );
}

