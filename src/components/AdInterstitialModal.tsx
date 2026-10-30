import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface AdInterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdInterstitialModal: React.FC<AdInterstitialModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

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
            全螢幕插頁廣告 (AdMob Interstitial)
          </span>

          {countdown > 0 ? (
            <span className="text-xs font-mono text-zinc-400">
              {countdown} 秒後可關閉
            </span>
          ) : (
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition"
              title="跳過廣告"
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
            《螢幕大聲公》VIP 免廣告權益
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed">
            【這是退出全螢幕手持模式時觸發的插頁廣告示範】<br />
            業界手持彈幕 App 最主要的收入來源即為<strong>退出全螢幕時</strong>的 5 秒插頁廣告，平均千次展示收益（eCPM）高達 $4 ~ $12 美元！
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold shadow-md transition"
          >
            {countdown > 0 ? `請稍候 (${countdown}s)` : '關閉廣告返回編輯器'}
          </button>
        </div>

        <p className="text-[10px] text-zinc-500 text-center mt-3">
          正式上架後此處將替換為 Google AdMob 官方原生廣告代碼
        </p>
      </div>
    </div>
  );
};
