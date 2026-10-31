import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BannerConfig } from '../types/banner';
import { MarqueeCanvas } from './MarqueeCanvas';
import { useWakeLock } from '../hooks/useWakeLock';
import { 
  X, 
  Play, 
  Pause, 
  RotateCw, 
  Sparkles, 
  Sun, 
  Maximize2, 
  Minimize2, 
  FlipHorizontal,
  Zap,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations, SupportedLanguage } from '../i18n/translations';

interface FullscreenDisplayProps {
  config: BannerConfig;
  onClose: () => void;
  onUpdateConfig: (partial: Partial<BannerConfig>) => void;
  lang?: SupportedLanguage;
}

export const FullscreenDisplay: React.FC<FullscreenDisplayProps> = ({
  config,
  onClose,
  onUpdateConfig,
  lang = 'zh-TW',
}) => {
  const t = translations[lang];
  const [isPaused, setIsPaused] = useState(false);
  const [showHUD, setShowHUD] = useState(true);
  const [isForcedLandscape, setIsForcedLandscape] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [isStrobing, setIsStrobing] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  // Screen Wake Lock
  const { requestLock, releaseLock, isLocked } = useWakeLock();

  useEffect(() => {
    // Request wake lock on enter
    requestLock();

    // Try native fullscreen if available
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    return () => {
      releaseLock();
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [requestLock, releaseLock]);

  // Auto-hide HUD after 3 seconds of inactivity
  const resetHideTimer = useCallback(() => {
    setShowHUD(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setShowHUD(false);
    }, 2800);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [resetHideTimer]);

  // Flashlight / Strobe effect
  useEffect(() => {
    if (!isStrobing) return;
    const interval = setInterval(() => {
      setBrightness((prev) => (prev === 100 ? 20 : 100));
    }, 120);
    return () => {
      clearInterval(interval);
      setBrightness(100);
    };
  }, [isStrobing]);

  const handleScreenClick = () => {
    resetHideTimer();
  };

  const handleConfettiCheer = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0055', '#00ffcc', '#ffcc00', '#3b82f6', '#a855f7'],
    });
  };

  return (
    <div
      onClick={handleScreenClick}
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
      className="fixed inset-0 w-screen h-screen z-50 bg-black flex items-center justify-center overflow-hidden cursor-pointer select-none m-0 p-0"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Marquee Display Canvas Container */}
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-300 ${
          isForcedLandscape ? 'rotate-90 origin-center scale-[1.3]' : ''
        }`}
      >
        <MarqueeCanvas
          config={config}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((prev) => !prev)}
        />
      </div>

      {/* Floating HUD Controls Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 flex flex-col justify-between p-4 md:p-6 ${
          showHUD ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 bg-zinc-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-700/60 text-xs text-zinc-300 shadow-xl">
            <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
            <span>{isLocked ? t.screenAlwaysOn : t.holdingSign}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleConfettiCheer}
              className="p-2.5 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white shadow-xl transition-transform active:scale-90"
              title={t.confettiCheer}
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsForcedLandscape((prev) => !prev);
              }}
              className="p-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 shadow-xl transition-transform active:scale-90"
              title={t.toggleLandscape}
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2.5 rounded-full bg-red-600/90 hover:bg-red-500 text-white shadow-xl transition-transform active:scale-90"
              title={t.exitFullscreen}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom bar quick controls */}
        <div className="self-center bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-5 pointer-events-auto">
          {/* Pause / Play */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused((prev) => !prev);
            }}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition active:scale-95"
            title={isPaused ? t.playing : t.paused}
          >
            {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
          </button>

          {/* Speed adjuster */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Gauge className="w-4 h-4 text-zinc-300" />
            <input
              type="range"
              min="1"
              max="10"
              value={config.speed}
              onChange={(e) => {
                e.stopPropagation();
                onUpdateConfig({ speed: Number(e.target.value) });
              }}
              className="w-20 md:w-28 accent-pink-500 cursor-pointer"
            />
            <span className="font-mono text-zinc-200 w-5 text-right">{config.speed}x</span>
          </div>

          <div className="h-4 w-px bg-zinc-800" />

          {/* Mirror toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateConfig({ isMirrored: !config.isMirrored });
            }}
            className={`p-2 rounded-xl border transition ${
              config.isMirrored
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-zinc-800/80 border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
            title={t.mirrorText}
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Strobe flash toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsStrobing((prev) => !prev);
            }}
            className={`p-2 rounded-xl border transition ${
              isStrobing
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
                : 'bg-zinc-800/80 border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
            title={t.strobeFlash}
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
