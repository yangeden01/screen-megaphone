import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, X } from 'lucide-react';

import { SupportedLanguage, translations } from '../i18n/translations';

interface PWAInstallButtonProps {
  lang?: SupportedLanguage;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ lang = 'zh-TW' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = translations[lang];

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Chromium / Android / Desktop flow */}
      {isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition active:scale-95 whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.installApp}</span>
        </button>
      )}

      {/* iOS Safari flow */}
      {isIOS && !isInstallable && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-pink-400" />
          <span>{t.addToHomeScreen}</span>
        </button>
      )}

      {/* iOS Instruction Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Download className="w-4 h-4 text-pink-400" />
                {t.installOnIOS}
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-800/50">
                <Share className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>{t.iosStep1}</p>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-800/50">
                <PlusSquare className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <p>{t.iosStep2}</p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-xl bg-zinc-800 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition"
            >
              {t.gotIt}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
