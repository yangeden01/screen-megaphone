import React from 'react';
import { BannerConfig, RenderMode, ScrollDirection, ColorPresetId, FontStyle } from '../types/banner';
import { 
  Type, 
  Palette, 
  MoveHorizontal, 
  Sparkles, 
  FlipHorizontal, 
  Zap, 
  Sliders, 
  Square,
  Flame,
  Grid
} from 'lucide-react';

interface EditorControlsProps {
  config: BannerConfig;
  onChange: (partial: Partial<BannerConfig>) => void;
}

export const EditorControls: React.FC<EditorControlsProps> = ({ config, onChange }) => {
  const colorPresets: { id: ColorPresetId; label: string; preview: string; color: string }[] = [
    { id: 'amber-gold', label: '琥珀金', preview: 'bg-gradient-to-r from-amber-400 to-yellow-500', color: '#f59e0b' },
    { id: 'rainbow', label: '炫彩虹', preview: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500', color: '#a855f7' },
    { id: 'hot-pink', label: '應援粉', preview: 'bg-gradient-to-r from-pink-500 to-rose-400', color: '#ec4899' },
    { id: 'cyber-cyan', label: '賽博青', preview: 'bg-gradient-to-r from-cyan-400 to-blue-500', color: '#06b6d4' },
    { id: 'electric-lime', label: '螢光綠', preview: 'bg-gradient-to-r from-lime-400 to-emerald-400', color: '#84cc16' },
    { id: 'police-strobe', label: '紅白暴閃', preview: 'bg-gradient-to-r from-red-500 to-blue-600', color: '#ef4444' },
    { id: 'pure-white', label: '純白晶', preview: 'bg-white', color: '#ffffff' },
  ];

  const renderModes: { id: RenderMode; label: string; desc: string }[] = [
    { id: 'led-matrix', label: '擬真點陣', desc: '真實 LED 發光二極體' },
    { id: 'neon-glow', label: '炫目霓虹', desc: '強烈光暈擴散' },
    { id: 'pixel-art', label: '復古像素', desc: '8-bit 電子螢幕' },
    { id: 'clean', label: '清晰極簡', desc: '超遠距離高對比' },
  ];

  const directions: { id: ScrollDirection; label: string }[] = [
    { id: 'left', label: '向左滾動 ←' },
    { id: 'right', label: '向右滾動 →' },
    { id: 'static', label: '靜止居中 ⏹' },
    { id: 'blink', label: '原地閃爍 ⚡' },
    { id: 'bounce', label: '左右彈跳 ↔' },
  ];

  const fonts: { id: FontStyle; label: string; sample: string }[] = [
    { id: 'Orbitron', label: '數位數碼 (Orbitron)', sample: '123' },
    { id: 'Noto Sans TC', label: '粗體黑體 (Noto Bold)', sample: '中' },
    { id: 'DotGothic16', label: '點陣字體 (DotGothic)', sample: '點' },
    { id: 'VT323', label: '復古終端 (VT323)', sample: 'A' },
  ];

  return (
    <div className="space-y-5 text-sm">
      {/* 1. Text input */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-pink-400" />
            彈幕內容 (支援文字與 Emoji)
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {config.text.length} 字
          </span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={config.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="請輸入彈幕內容..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition"
          />
          {config.text && (
            <button
              onClick={() => onChange({ text: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200"
            >
              清空
            </button>
          )}
        </div>
      </div>

      {/* 2. Render Mode selection */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
          <Grid className="w-3.5 h-3.5 text-cyan-400" />
          顯示樣式效果
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {renderModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onChange({ renderMode: mode.id })}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                config.renderMode === mode.id
                  ? 'bg-zinc-800 border-pink-500 text-pink-400 shadow-sm'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className="text-xs font-semibold text-zinc-100">{mode.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Color presets */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            色彩主題與特效
          </span>
          <span className="text-[11px] text-zinc-500">
            {config.colorPreset === 'rainbow' ? '🌈 動態彩虹中' : ''}
          </span>
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {colorPresets.map((preset) => {
            const isSelected = config.colorPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onChange({ colorPreset: preset.id, textColor: preset.color })}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'border-white bg-zinc-800 ring-2 ring-pink-500/50'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full ${preset.preview} shadow-sm`} />
                <span className="text-[11px] text-zinc-300 truncate w-full text-center">
                  {preset.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom hex color input */}
        <div className="mt-2.5 flex items-center gap-2">
          <input
            type="color"
            value={config.textColor}
            onChange={(e) => onChange({ colorPreset: 'custom', textColor: e.target.value })}
            className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
            title="自訂顏色"
          />
          <span className="text-xs text-zinc-400 font-mono">{config.textColor}</span>
          <span className="text-xs text-zinc-500">點擊色塊自選任意色彩</span>
        </div>
      </div>

      {/* 4. Direction & Scrolling Mode */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
          <MoveHorizontal className="w-3.5 h-3.5 text-blue-400" />
          滾動方向與動態
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {directions.map((dir) => (
            <button
              key={dir.id}
              onClick={() => onChange({ direction: dir.id })}
              className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                config.direction === dir.id
                  ? 'bg-zinc-800 border-pink-500 text-zinc-100'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {dir.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Sliders: Speed, Size, Glow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {/* Speed */}
        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-300 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-pink-400" />
              滾動速度
            </span>
            <span className="font-mono text-pink-400 font-semibold">{config.speed}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={config.speed}
            onChange={(e) => onChange({ speed: Number(e.target.value) })}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        {/* Font Size */}
        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-300 flex items-center gap-1">
              <Type className="w-3 h-3 text-cyan-400" />
              文字大小
            </span>
            <span className="font-mono text-cyan-400 font-semibold">{config.fontSize}px</span>
          </div>
          <input
            type="range"
            min="36"
            max="130"
            step="2"
            value={config.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Glow Intensity */}
        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              發光強度
            </span>
            <span className="font-mono text-amber-400 font-semibold">{config.glowIntensity}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={config.glowIntensity}
            onChange={(e) => onChange({ glowIntensity: Number(e.target.value) })}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* 6. Typography font selection */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-purple-400" />
          LED 字體風格
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ fontFamily: f.id })}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                config.fontFamily === f.id
                  ? 'bg-zinc-800 border-pink-500 text-zinc-100'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="text-xs font-medium truncate">{f.label}</div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{f.sample} 範例</div>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Special Toggles: Blinking, Mirror, Frame, Dot Size */}
      <div className="pt-1 flex flex-wrap gap-2.5">
        {/* Blinking toggle */}
        <button
          onClick={() => onChange({ isBlinking: !config.isBlinking })}
          className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
            config.isBlinking
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>狂歡暴閃: {config.isBlinking ? '已開啟' : '關閉'}</span>
        </button>

        {/* Mirror mode toggle */}
        <button
          onClick={() => onChange({ isMirrored: !config.isMirrored })}
          className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
            config.isMirrored
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FlipHorizontal className="w-3.5 h-3.5" />
          <span>鏡像反轉: {config.isMirrored ? '開啟 (反字)' : '正常'}</span>
        </button>

        {/* Border frame toggle */}
        <button
          onClick={() => onChange({ hasBorder: !config.hasBorder })}
          className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
            config.hasBorder
              ? 'bg-pink-500/20 border-pink-500 text-pink-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Square className="w-3.5 h-3.5" />
          <span>霓虹燈邊框: {config.hasBorder ? '開啟' : '無'}</span>
        </button>
      </div>
    </div>
  );
};
