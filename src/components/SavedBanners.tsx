import React from 'react';
import { BannerConfig } from '../types/banner';
import { Bookmark, Play, Trash2 } from 'lucide-react';
import { SupportedLanguage, translations } from '../i18n/translations';

interface SavedBannersProps {
  savedList: BannerConfig[];
  onSelect: (config: BannerConfig) => void;
  onDelete: (id: string) => void;
  onSaveCurrent: () => void;
  isCurrentSaved: boolean;
  lang?: SupportedLanguage;
}

export const SavedBanners: React.FC<SavedBannersProps> = ({
  savedList,
  onSelect,
  onDelete,
  onSaveCurrent,
  isCurrentSaved,
  lang = 'zh-TW',
}) => {
  const t = translations[lang];

  const getRenderModeShort = (mode?: string) => {
    switch (mode) {
      case 'led-matrix': return lang === 'zh-TW' || lang === 'zh-CN' ? '點陣' : 'LED';
      case 'neon-glow': return lang === 'zh-TW' || lang === 'zh-CN' ? '霓虹' : 'Neon';
      case 'outline-stroke': return lang === 'zh-TW' || lang === 'zh-CN' ? '雙色' : '3D';
      default: return lang === 'zh-TW' || lang === 'zh-CN' ? '簡約' : 'Clean';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-pink-400" />
          {t.savedTitle} ({savedList.length})
        </span>
        <button
          onClick={onSaveCurrent}
          disabled={isCurrentSaved}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
            isCurrentSaved
              ? 'bg-zinc-800 text-zinc-500 cursor-default'
              : 'bg-pink-600 hover:bg-pink-500 text-white shadow-sm'
          }`}
        >
          {isCurrentSaved ? t.alreadySaved : t.saveCurrentBanner}
        </button>
      </div>

      {savedList.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-zinc-800 text-center text-xs text-zinc-500">
          {t.emptySaved}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {savedList.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition group"
            >
              <div
                onClick={() => onSelect(item)}
                className="flex-1 min-w-0 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.textColor || '#f59e0b' }}
                  />
                  <span className="text-xs font-semibold text-zinc-100 truncate">
                    {item.text || t.noText}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                  <span>{t.speedLabel} {item.speed}x</span>
                  <span>·</span>
                  <span>{getRenderModeShort(item.renderMode)}</span>
                  <span>·</span>
                  <span>{item.fontFamily}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onSelect(item)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-pink-400 hover:bg-zinc-800 transition"
                  title={t.loadAndUse}
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition"
                  title={t.delete}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
