import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

import { SupportedLanguage, translations } from '../i18n/translations';

interface AdInterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: SupportedLanguage;
}

export const AdInterstitialModal: React.FC<AdInterstitialModalProps> = ({
  isOpen,
  onClose,
  lang = 'zh-TW',
}) => {
  const [countdown, setCountdown] = useState(5);
  const t = translations[lang];

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl p-5 relative overflow-hidden">
        {/* Ad Tag & Skip Countdown */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase">
            {t.interstitialAd}
          </span>

          {countdown > 0 ? (
            <span className="text-xs font-mono text-zinc-400">
              {countdown} {t.closeInSeconds}
            </span>
          ) : (
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition"
              title={t.skipAd}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ad Content Mock / Educational Showcase */}
        <div className="rounded-xl bg-gradient-to-br from-pink-500/20 via-zinc-950 to-cyan-500/20 border border-zinc-800 p-6 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-base font-bold text-zinc-100">
            {t.vipNoAds}
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">
            {t.adDemoDesc}
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold shadow-md transition"
          >
            {countdown > 0 ? `${t.waitSeconds} (${countdown}s)` : t.closeAdReturn}
          </button>
        </div>

        <p className="text-[10px] text-zinc-500 text-center mt-3 font-mono">
          Google AdMob Ready • eCPM $4 - $12
        </p>
      </div>
    </div>
  );
};
