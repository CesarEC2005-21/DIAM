'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ src, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!autoPlay) return;
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const attemptPlay = () => {
      if (!audio || cancelled) return;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (cancelled) return;
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            // Autoplay con sonido bloqueado: intentar en silencio
            if (cancelled) return;
            audio.muted = true;
            audio
              .play()
              .then(() => {
                if (cancelled) return;
                setIsPlaying(true);
                setIsMuted(true);
              })
              .catch(() => {
                setIsPlaying(false);
              });
          });
      }
    };

    attemptPlay();

    const unlockAudio = () => {
      if (!audio) return;
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});
      removeListeners();
    };

    const removeListeners = () => {
      document.removeEventListener('pointerdown', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('pointerdown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    return () => {
      cancelled = true;
      removeListeners();
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(err => {
        console.log("Audio play error:", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md border border-rose-200/90 px-3.5 py-2 rounded-full shadow-lg shadow-rose-900/10 text-rose-900 transition-all hover:border-rose-300 hover:bg-white">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-900 hover:text-rose-600 transition-colors"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 text-rose-600 animate-pulse" />
              <span className="hidden sm:inline">Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Nuestra Música</span>
            </>
          )}
        </button>

        {/* Animated equalizer waves when playing */}
        <div className="flex items-end gap-0.5 h-3.5 px-1">
          <span className={`w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
          <span className={`w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full transition-all duration-200 ${isPlaying ? 'h-2 animate-bounce' : 'h-1'}`} />
          <span className={`w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
          <span className={`w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full transition-all duration-150 ${isPlaying ? 'h-1.5 animate-bounce' : 'h-1'}`} />
        </div>

        <button
          onClick={toggleMute}
          className="text-rose-700/80 hover:text-rose-950 transition-colors p-0.5"
          title={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

