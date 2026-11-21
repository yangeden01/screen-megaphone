import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BannerConfig } from '../types/banner';
import { SupportedLanguage, translations } from '../i18n/translations';
import { resolveCanvasFont, fontSizeToHeightRatio } from '../utils/fontHelper';

interface MarqueeCanvasProps {
  config: BannerConfig;
  isPaused?: boolean;
  className?: string;
  onTogglePause?: () => void;
  lang?: SupportedLanguage;
  /** 為 true 時停止繪製（例如全螢幕蓋住編輯頁預覽時），省電 */
  suspended?: boolean;
}

// 發光 LED 點的預繪圖（每種顏色一張），避免每一幀對每顆點做 shadowBlur
type DotSprite = { canvas: HTMLCanvasElement; half: number };

export const MarqueeCanvas: React.FC<MarqueeCanvasProps> = ({
  config,
  isPaused = false,
  className = '',
  onTogglePause,
  lang = 'zh-TW',
  suspended = false,
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

  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  // 背景格點只在尺寸或點距改變時重畫一次
  const gridCacheRef = useRef<{ key: string; canvas: HTMLCanvasElement } | null>(null);
  // 發光點預繪圖快取，key = 顏色|點大小|光暈|dpr
  const spriteCacheRef = useRef<Map<string, DotSprite>>(new Map());
  // 字體載入完成後遞增，觸發重新繪製
  const [fontsReadyTick, setFontsReadyTick] = useState(0);

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
    // 量化到 10 度一階，讓點陣模式的發光點預繪圖可以重複使用
    const hue = Math.round(((xPercent * 360 + timeOffset * 70) % 360) / 10) * 10;
    return `hsl(${hue}, 100%, 60%)`;
  }, []);

  // 確保畫布用到的字體已載入：Canvas 本身不會觸發網頁字體下載，
  // 要主動 load，載入完成後重新開始繪製迴圈，避免一直停在預設字體。
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts?.load) return;
    let cancelled = false;
    const { fontString } = resolveCanvasFont(config.fontFamily, lang, 48);
    document.fonts
      .load(fontString, config.text || 'A')
      .then((faces) => {
        if (!cancelled && faces.length > 0) setFontsReadyTick((n) => n + 1);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [config.fontFamily, config.text, lang]);

  const getDotSprite = useCallback(
    (color: string, dotSize: number, glow: number, dpr: number): DotSprite => {
      const key = `${color}|${dotSize}|${glow}|${dpr}`;
      const cache = spriteCacheRef.current;
      const hit = cache.get(key);
      if (hit) return hit;

      // 以最大亮度（半徑 = dotSize/2 * 1.2）預繪，繪製時再依亮度縮放
      const radius = (dotSize / 2) * 1.2;
      const blur = glow > 0 ? glow * 2.5 : 0;
      const half = Math.ceil(radius + blur * 1.5 + 2);
      const c = document.createElement('canvas');
      c.width = c.height = Math.ceil(half * 2 * dpr);
      const g = c.getContext('2d');
      if (g) {
        g.scale(dpr, dpr);
        if (blur > 0) {
          g.shadowColor = color;
          g.shadowBlur = blur * dpr;
        }
        g.fillStyle = color;
        g.beginPath();
        g.arc(half, half, Math.max(1, radius), 0, Math.PI * 2);
        g.fill();
        g.shadowBlur = 0;
        g.fillStyle = '#ffffff';
        g.beginPath();
        g.arc(half - radius * 0.25, half - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
        g.fill();
      }
      const sprite = { canvas: c, half };
      if (cache.size > 200) cache.clear();
      cache.set(key, sprite);
      return sprite;
    },
    []
  );

  // Main rendering loop
  useEffect(() => {
    if (suspended) return;
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

    // Prepare reusable offscreen canvas for dot-matrix and pixel-art modes
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offCanvas = offscreenCanvasRef.current;

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

      // Render dot matrix pattern if in LED matrix mode
      if (config.renderMode === 'led-matrix') {
        const gridKey = `${w}x${h}@${dpr}|${dotPitch}|${config.dotSize}`;
        let grid = gridCacheRef.current;
        if (!grid || grid.key !== gridKey) {
          const gc = document.createElement('canvas');
          gc.width = Math.ceil(w * dpr);
          gc.height = Math.ceil(h * dpr);
          const g = gc.getContext('2d');
          if (g) {
            g.scale(dpr, dpr);
            g.fillStyle = 'rgba(255, 255, 255, 0.06)';
            const dotR = Math.max(0.5, config.dotSize / 2 - 0.5);
            g.beginPath();
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const cx = c * dotPitch + dotPitch / 2;
                const cy = r * dotPitch + dotPitch / 2;
                g.moveTo(cx + dotR, cy);
                g.arc(cx, cy, dotR, 0, Math.PI * 2);
              }
            }
            g.fill();
          }
          grid = { key: gridKey, canvas: gc };
          gridCacheRef.current = grid;
        }
        ctx.drawImage(grid.canvas, 0, 0, w, h);
      } else if (config.renderMode === 'pixel-art') {
        // Subtle 8-bit retro arcade background grid lines
        const blockSize = Math.max(3, Math.min(8, Math.round(config.fontSize / 15)));
        const gridCols = Math.ceil(w / blockSize);
        const gridRows = Math.ceil(h / blockSize);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        for (let r = 0; r < gridRows; r += 2) {
          ctx.fillRect(0, r * blockSize, w, 1);
        }
      }

      // Dynamically resolve optimal font family stack based on active language
      // 字級依畫面短邊自動縮放：橫向時撐滿高度；直向時不會大到一次只看到一個字
      let currentFontSize = Math.max(12, Math.min(w, h) * fontSizeToHeightRatio(config.fontSize));
      let { fontString } = resolveCanvasFont(config.fontFamily, lang, currentFontSize);
      ctx.font = fontString;
      ctx.textBaseline = 'middle';
      let textWidth = ctx.measureText(config.text).width;

      // 不捲動的模式（置中、閃爍、來回）文字必須完整放進畫面，太寬就縮小
      const mustFitWidth =
        config.direction === 'static' || config.direction === 'blink' || config.direction === 'bounce';
      const maxWidth = w * 0.92;
      if (mustFitWidth && textWidth > maxWidth && textWidth > 0) {
        currentFontSize = Math.max(12, currentFontSize * (maxWidth / textWidth));
        ({ fontString } = resolveCanvasFont(config.fontFamily, lang, currentFontSize));
        ctx.font = fontString;
        textWidth = ctx.measureText(config.text).width;
      }

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
          // ========================================================
          // MODE 1: PHYSICAL LED DOT-MATRIX DIODE RENDERER
          // Circular glowing diodes with dot-gap and bright diode cores
          // ========================================================
          const pitch = config.dotSize + config.dotGap;
          const matrixCols = Math.ceil(w / pitch);
          const matrixRows = Math.ceil(h / pitch);

          if (offCanvas.width !== matrixCols || offCanvas.height !== matrixRows) {
            offCanvas.width = matrixCols;
            offCanvas.height = matrixRows;
          }
          const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

          if (offCtx) {
            offCtx.fillStyle = '#000000';
            offCtx.fillRect(0, 0, matrixCols, matrixRows);
            
            const gridFontSize = currentFontSize / pitch;
            const { fontString: offFontString } = resolveCanvasFont(config.fontFamily, lang, gridFontSize);
            offCtx.font = offFontString;
            offCtx.textBaseline = 'middle';
            offCtx.fillStyle = '#ffffff';

            const gridTextX = textX / pitch;
            const gridTextY = matrixRows / 2;
            offCtx.fillText(config.text, gridTextX, gridTextY);

            const imgData = offCtx.getImageData(0, 0, matrixCols, matrixRows);
            const data = imgData.data;

            // Draw circular glowing diode units
            for (let r = 0; r < matrixRows; r++) {
              for (let c = 0; c < matrixCols; c++) {
                const idx = (r * matrixCols + c) * 4;
                const brightness = data[idx] / 255;
                
                if (brightness > 0.18) {
                  const cx = c * pitch + pitch / 2;
                  const cy = r * pitch + pitch / 2;
                  const dotRadius = (config.dotSize / 2) * Math.min(1.2, brightness * 1.1);

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

                  // 貼上預繪的發光點，依亮度縮放（取代逐點 shadowBlur）
                  const sprite = getDotSprite(litColor, config.dotSize, config.glowIntensity, dpr);
                  const scale = Math.max(1, dotRadius) / ((config.dotSize / 2) * 1.2);
                  const size = sprite.half * 2 * scale;
                  ctx.drawImage(sprite.canvas, cx - size / 2, cy - size / 2, size, size);
                }
              }
            }
          }
        } else if (config.renderMode === 'outline-stroke' || config.renderMode === 'pixel-art') {
          // ========================================================
          // MODE 2: 3D DUO-TONE OUTLINE STROKE (雙色立體描邊)
          // Concert idol & stadium cheer style: Ultra-sharp contrasting border + 3D extrusion
          // Guarantees 100% CJK Chinese character legibility without stroke bleeding
          // ========================================================
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

          const strokeWidth = Math.max(4, Math.round(currentFontSize / 9));
          const offset3D = Math.max(3, Math.round(currentFontSize / 18));

          ctx.save();

          // 1. 3D Drop Extrusion Shadow for stadium depth
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
          ctx.lineWidth = strokeWidth + 4;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.miterLimit = 2;
          ctx.shadowColor = typeof fillStyle === 'string' ? fillStyle : '#f43f5e';
          ctx.shadowBlur = config.glowIntensity * 2.2;
          ctx.strokeText(config.text, textX + offset3D, textY + offset3D);

          // 2. Thick contrasting black outline: keeps Chinese characters razor-sharp!
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = strokeWidth;
          ctx.strokeText(config.text, textX, textY);

          // 3. Inner neon highlight border
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = Math.max(1.5, strokeWidth * 0.28);
          ctx.strokeText(config.text, textX, textY);

          // 4. Vibrant foreground fill
          ctx.fillStyle = fillStyle;
          ctx.fillText(config.text, textX, textY);

          ctx.restore();
        } else if (config.renderMode === 'neon-glow') {
          // ========================================================
          // MODE 3: VECTOR NEON TUBE GLOW
          // Smooth blooming multi-pass neon radiance with bright white filament
          // ========================================================
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

          // Multi-pass neon tube radiance & bloom
          const glowColor = typeof fillStyle === 'string' ? fillStyle : '#ec4899';
          const blurLevels = [
            config.glowIntensity * 5,
            config.glowIntensity * 3,
            config.glowIntensity * 1.5,
          ];

          blurLevels.forEach((blur) => {
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = blur;
            ctx.fillStyle = fillStyle;
            ctx.fillText(config.text, textX, textY);
          });

          // Core tube text follows user's chosen theme color (Hot Pink, Amber Gold, Cyan, Rainbow, etc.)
          ctx.shadowBlur = Math.max(2, config.glowIntensity * 0.8);
          ctx.shadowColor = glowColor;
          ctx.fillStyle = fillStyle;
          ctx.fillText(config.text, textX, textY);
        } else {
          // ========================================================
          // MODE 4: CLEAN (ULTRA CONTRAST)
          // Razor-sharp modern vector typography, crisp edges, ultra-high readability
          // ========================================================
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

          ctx.save();
          // High-contrast clean outline & drop-shadow for pristine outdoor visibility
          ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
          ctx.shadowBlur = config.glowIntensity > 0 ? config.glowIntensity * 1.2 : 0;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;

          ctx.fillStyle = fillStyle;
          ctx.fillText(config.text, textX, textY);

          // Second crisp pass to guarantee razor-sharp contrast
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.fillStyle = fillStyle;
          ctx.fillText(config.text, textX, textY);
          ctx.restore();
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
    getDotSprite,
    lang,
    suspended,
    fontsReadyTick,
  ]);

  return (
    <div
      ref={containerRef}
      onClick={onTogglePause}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer ${className}`}
      title={translations[lang]?.previewTitle || '點擊暫停 / 播放'}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ imageRendering: config.renderMode === 'pixel-art' ? 'pixelated' : 'auto' }}
      />
      {isPaused && (
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-zinc-700/60 text-xs font-mono text-zinc-300 flex items-center gap-1.5 shadow-lg pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {translations[lang]?.paused || '已暫停'}
        </div>
      )}
    </div>
  );
};
