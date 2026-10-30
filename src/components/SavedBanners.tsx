import React from 'react';
import { BannerConfig } from '../types/banner';
import { Bookmark, Play, Trash2, Clock } from 'lucide-react';

interface SavedBannersProps {
  savedList: BannerConfig[];
  onSelect: (config: BannerConfig) => void;
  onDelete: (id: string) => void;
  onSaveCurrent: () => void;
  isCurrentSaved: boolean;
}

export const SavedBanners: React.FC<SavedBannersProps> = ({
  savedList,
  onSelect,
  onDelete,
  onSaveCurrent,
  isCurrentSaved,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-pink-400" />
          常用彈幕收藏庫 ({savedList.length})
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
          {isCurrentSaved ? '✓ 已在收藏庫' : '+ 收藏目前彈幕'}
        </button>
      </div>

      {savedList.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-zinc-800 text-center text-xs text-zinc-500">
          尚無收藏的彈幕，編輯完喜歡的內容後可點擊上方按鈕收藏！
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
                    {item.text || '(無文字)'}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                  <span>速度 {item.speed}x</span>
                  <span>·</span>
                  <span>{item.renderMode === 'led-matrix' ? '點陣' : '霓虹'}</span>
                  <span>·</span>
                  <span>{item.fontFamily}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onSelect(item)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-pink-400 hover:bg-zinc-800 transition"
                  title="載入並使用"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition"
                  title="刪除"
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
