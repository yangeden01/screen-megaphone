import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BannerConfig } from '../types/banner';

interface MarqueeCanvasProps {
  config: BannerConfig;
  isPaused?: boolean;
  className?: string;
  onTogglePause?: () => void;
}

export const MarqueeCanvas: React.FC<MarqueeCanvasProps> = ({
  config,
  isPaused = false,
  className = '',
  onTogglePause,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  
  // Internal state for position and animation tick
  const scrollPosRef = useRef<number>(0);
  const bounceDirRef = useRef<number>(-1); // -1 for left, 1 for right
  const lastTimeRef = useRef<number>(0);
  const blinkStateRef = useRef<boolean>(true);
  const blinkTimerRef = useRef<number>(0);
  const rainbowOffsetRef = useRef<number>(0);

  // Measure container size
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Update canvas size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setDimensions({ width: clientWidth, height: clientHeight });
        }
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleOrientation = () => {
      updateSize();
      setTimeout(updateSize, 80);
      setTimeout(updateSize, 200);
      setTimeout(updateSize, 400);
    };

    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  // Compute text color or rainbow gradient
  const getRainbowColor = useCallback((xPercent: number, timeOffset: number) => {
    const hue = (xPercent * 360 + timeOffset * 70) % 360;
    return `hsl(${hue}, 100%, 60%)`;
  }, []);

  // Main rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas internal resolution to handle DPR cleanly
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = dimensions.width;
    const h = dimensions.height;
    
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const render = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Handle blink state
      if (config.isBlinking) {
        blinkTimerRef.current += deltaTime * config.blinkSpeed * 2.5;
        if (blinkTimerRef.current >= 1) {
          blinkStateRef.current = !blinkStateRef.current;
          blinkTimerRef.current = 0;
        }
      } else {
        blinkStateRef.current = true;
      }

      // Rainbow tick
      rainbowOffsetRef.current += deltaTime * 0.8;

      // Clear background
      ctx.fillStyle = config.backgroundColor || '#09090b';
      ctx.fillRect(0, 0, w, h);

      // Handle mirroring
      ctx.save();
      if (config.isMirrored) {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
      }

      // Draw subtle background grid pattern for stadium LED screen feel
      const dotPitch = Math.max(config.dotSize + config.dotGap, 6);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      const cols = Math.ceil(w / dotPitch);
      const rows = Math.ceil(h / dotPitch);

      // Render dot matrix pattern if enabled
      if (config.renderMode === 'led-matrix') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * dotPitch + dotPitch / 2;
            const cy = r * dotPitch + dotPitch / 2;
            ctx.beginPath();
            ctx.arc(cx, cy, config.dotSize / 2 - 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Set text font
      const currentFontSize = config.fontSize;
      ctx.font = `900 ${currentFontSize}px "${config.fontFamily}", "Noto Sans TC", sans-serif`;
      ctx.textBaseline = 'middle';
      const textMetrics = ctx.measureText(config.text);
      const textWidth = textMetrics.width;

      // Calculate speed
      const baseSpeed = config.speed * 80; // pixels per sec
      const moveDelta = isPaused ? 0 : baseSpeed * deltaTime;

      // Update position based on direction
      if (config.direction === 'left') {
        scrollPosRef.current -= moveDelta;
        if (scrollPosRef.current < -textWidth - 40) {
          scrollPosRef.current = w + 40;
        }
      } else if (config.direction === 'right') {
        scrollPosRef.current += moveDelta;
        if (scrollPosRef.current > w + 40) {
          scrollPosRef.current = -textWidth - 40;
        }
      } else if (config.direction === 'static') {
        scrollPosRef.current = (w - textWidth) / 2;
      } else if (config.direction === 'bounce') {
        scrollPosRef.current += moveDelta * bounceDirRef.current;
        if (scrollPosRef.current <= 20) {
          scrollPosRef.current = 20;
          bounceDirRef.current = 1;
        } else if (scrollPosRef.current + textWidth >= w - 20) {
          scrollPosRef.current = Math.max(20, w - 20 - textWidth);
          bounceDirRef.current = -1;
        }
      } else if (config.direction === 'blink') {
        scrollPosRef.current = (w - textWidth) / 2;
      }

      const textX = scrollPosRef.current;
      const textY = h / 2;

      // If blinking and currently off, skip drawing the text
      const shouldDrawText = !config.isBlinking || blinkStateRef.current;

      if (shouldDrawText && config.text.trim().length > 0) {
        if (config.renderMode === 'led-matrix') {
          // --- FULL PHYSICAL LED DOT-MATRIX DIODE RENDERER ---
          // Render text into an offscreen buffer at smaller scale to sample active pixels
          const pitch = config.dotSize + config.dotGap;
          const matrixCols = Math.ceil(w / pitch);
          const matrixRows = Math.ceil(h / pitch);

          // We use an offscreen canvas to sample the rasterized text
          const offCanvas = document.createElement('canvas');
          offCanvas.width = matrixCols;
          offCanvas.height = matrixRows;
          const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

          if (offCtx) {
            offCtx.fillStyle = '#000000';
            offCtx.fillRect(0, 0, matrixCols, matrixRows);
            
            // Map text onto the matrix grid
            const gridFontSize = currentFontSize / pitch;
            offCtx.font = `900 ${gridFontSize}px "${config.fontFamily}", "Noto Sans TC", sans-serif`;
            offCtx.textBaseline = 'middle';
            offCtx.fillStyle = '#ffffff';

            const gridTextX = textX / pitch;
            const gridTextY = matrixRows / 2;
            offCtx.fillText(config.text, gridTextX, gridTextY);

            const imgData = offCtx.getImageData(0, 0, matrixCols, matrixRows);
            const data = imgData.data;

            // Draw glowing diode circles
            for (let r = 0; r < matrixRows; r++) {
              for (let c = 0; c < matrixCols; c++) {
                const idx = (r * matrixCols + c) * 4;
                const brightness = data[idx] / 255; // Red channel
                
                if (brightness > 0.18) {
                  const cx = c * pitch + pitch / 2;
                  const cy = r * pitch + pitch / 2;
                  const dotRadius = (config.dotSize / 2) * Math.min(1.2, brightness * 1.1);

                  // Color resolution
                  let litColor = config.textColor;
                  if (config.colorPreset === 'rainbow') {
                    litColor = getRainbowColor(c / matrixCols, rainbowOffsetRef.current);
                  } else if (config.colorPreset === 'police-strobe') {
                    const isLeftHalf = c < matrixCols / 2;
                    const strobeToggle = Math.floor(time * 0.006) % 2 === 0;
                    litColor = strobeToggle
                      ? (isLeftHalf ? '#ef4444' : '#3b82f6')
                      : (isLeftHalf ? '#3b82f6' : '#ef4444');
                  }

                  // Diode Glow Bloom
                  if (config.glowIntensity > 0) {
                    ctx.shadowColor = litColor;
                    ctx.shadowBlur = config.glowIntensity * 2.5;
                  } else {
                    ctx.shadowBlur = 0;
                  }

                  ctx.fillStyle = litColor;
                  ctx.beginPath();
                  ctx.arc(cx, cy, Math.max(1, dotRadius), 0, Math.PI * 2);
                  ctx.fill();

                  // Diode core bright highlight
                  ctx.shadowBlur = 0;
                  ctx.fillStyle = '#ffffff';
                  ctx.beginPath();
                  ctx.arc(cx - dotRadius * 0.25, cy - dotRadius * 0.25, dotRadius * 0.35, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
          }
        } else {
          // --- VECTOR NEON GLOW / PIXEL / CLEAN RENDERING ---
          let fillStyle: string | CanvasGradient = config.textColor;

          if (config.colorPreset === 'rainbow') {
            const grad = ctx.createLinearGradient(0, 0, w, 0);
            for (let i = 0; i <= 6; i++) {
              const stop = i / 6;
              const hue = (stop * 360 + rainbowOffsetRef.current * 80) % 360;
              grad.addColorStop(stop, `hsl(${hue}, 100%, 65%)`);
            }
            fillStyle = grad;
          } else if (config.colorPreset === 'police-strobe') {
            const strobeToggle = Math.floor(time * 0.006) % 2 === 0;
            fillStyle = strobeToggle ? '#ef4444' : '#3b82f6';
          }

          if (config.renderMode === 'neon-glow') {
            // Multi-pass neon bloom
            const glowColor = typeof fillStyle === 'string' ? fillStyle : '#ec4899';
            const blurLevels = [config.glowIntensity * 4, config.glowIntensity * 2, config.glowIntensity];

            blurLevels.forEach((blur) => {
              ctx.shadowColor = glowColor;
              ctx.shadowBlur = blur;
              ctx.fillStyle = fillStyle;
              ctx.fillText(config.text, textX, textY);
            });

            // Bright core text
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(config.text, textX, textY);
          } else {
            // Clean or Pixel Art mode
            if (config.glowIntensity > 0) {
              ctx.shadowColor = typeof fillStyle === 'string' ? fillStyle : '#06b6d4';
              ctx.shadowBlur = config.glowIntensity * 2;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillStyle = fillStyle;
            ctx.fillText(config.text, textX, textY);
          }
        }
      }

      // Draw optional decorative border
      if (config.hasBorder) {
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = config.borderColor || '#38bdf8';
        ctx.strokeStyle = config.borderColor || '#38bdf8';
        ctx.lineWidth = 4;
        ctx.strokeRect(6, 6, w - 12, h - 12);
        ctx.restore();
      }

      ctx.restore();

      // Next frame
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    dimensions,
    config,
    isPaused,
    getRainbowColor,
  ]);

  return (
    <div
      ref={containerRef}
      onClick={onTogglePause}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer ${className}`}
      title="點擊暫停 / 播放"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ imageRendering: config.renderMode === 'pixel-art' ? 'pixelated' : 'auto' }}
      />
      {isPaused && (
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-zinc-700/60 text-xs font-mono text-zinc-300 flex items-center gap-1.5 shadow-lg pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          已暫停
        </div>
      )}
    </div>
  );
};
