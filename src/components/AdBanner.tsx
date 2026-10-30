import React, { useState } from 'react';
import { Sparkles, Info, X } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slotId = 'default-bottom-banner', className = '' }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  if (isDismissed) return null;

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Container simulating a standard Google AdMob / AdSense 320x50 or 728x90 Adaptive Banner */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-900/90 border border-zinc-800/80 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md">
        {/* Left: Ad tag & info */}
        <div className="flex items-center gap-2.5">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700/60 uppercase">
            AD 廣告位
          </span>
          <div className="text-zinc-300">
            <span className="font-semibold text-zinc-200">AdMob 智慧橫幅廣告位</span>
            <span className="hidden sm:inline text-zinc-500 ml-1.5">
              (在 Google Play 上架後將自動載入 Google AdMob 贊助商廣告)
            </span>
          </div>
        </div>

        {/* Center: Creative sample placeholder */}
        <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
          <span className="text-pink-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            無伺服器營運成本，高收益持續變現
          </span>
        </div>

        {/* Right: Info and dismiss for preview */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTooltip((prev) => !prev)}
            className="p-1 rounded text-zinc-400 hover:text-zinc-200"
            title="廣告位置說明"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded text-zinc-400 hover:text-zinc-200"
            title="預覽關閉"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tooltip explain */}
        {showTooltip && (
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md p-3 flex items-center justify-between z-10 text-[11px] text-zinc-300">
            <div>
              <strong>位置說明：</strong>此處為「主介面常駐橫幅」。全螢幕應援時會自動隱藏，確保舞台表演時 100% 乾淨無干擾。
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[10px]"
            >
              關閉提示
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
