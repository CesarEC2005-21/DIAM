'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

interface AudioPlayerProps {
  songs: Song[];
  autoPlay?: boolean;
}

export default function AudioPlayer({ songs, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const firstRender = useRef<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (!autoPlay) return;
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const attempt = () => {
      if (!audio || cancelled) return;
      audio.muted = false;
      audio
        .play()
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
              if (!cancelled) setIsPlaying(false);
            });
        });
    };

    attempt();

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

  useEffect(() => {
    // No interrumpir la reproducción automática del montaje inicial
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [currentIndex]);

  const selectSong = (index: number) => {
    if (index === currentIndex) {
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});
      return;
    }
    setCurrentIndex(index);
  };

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
    <div className="fixed top-4 right-3 sm:top-5 sm:right-5 z-50 flex flex-col items-end gap-1.5 sm:gap-2 max-w-[calc(100vw-1.5rem)]">
      <audio
        ref={audioRef}
        src={currentSong.url}
        loop
        preload="auto"
      />

      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-md border border-rose-200/90 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-lg shadow-rose-900/10 text-rose-900 transition-all hover:border-rose-300 hover:bg-white">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-rose-900 hover:text-rose-600 transition-colors"
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
              <span className="hidden sm:inline">Reproducir</span>
            </>
          )}
        </button>

        {/* Animated equalizer waves when playing */}
        <div className="flex items-end gap-0.5 h-3.5 px-0.5 sm:px-1">
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

      {/* Selector de canción */}
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md border border-rose-200/90 rounded-2xl sm:rounded-full p-1 shadow-lg shadow-rose-900/10">
        <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 mx-0.5 sm:mx-1 shrink-0" />
        {songs.map((song, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={song.id}
              onClick={() => selectSong(index)}
              title={`${song.title} — ${song.artist}`}
              aria-pressed={isActive}
              className={`flex flex-col items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-wider leading-tight transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm shadow-rose-500/30'
                  : 'text-rose-900/80 hover:bg-rose-50'
              }`}
            >
              <span className="whitespace-nowrap">Opción {index + 1}</span>
              <span
                className={`block max-w-[64px] sm:max-w-[90px] truncate text-center text-[9px] font-normal normal-case tracking-normal ${
                  isActive ? 'text-white/85' : 'text-rose-900/60'
                }`}
              >
                {song.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
