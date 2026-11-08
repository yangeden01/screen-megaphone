import React from 'react';
import { PresetTemplate, BannerConfig } from '../types/banner';
import { Sparkles, Plane, PartyPopper, Heart, Car } from 'lucide-react';

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 't-1',
    category: '應援',
    label: '經典 Hello World',
    text: 'Hello World ✨',
    config: {
      colorPreset: 'amber-gold',
      textColor: '#f59e0b',
      fontSize: 72,
      speed: 4,
      direction: 'left',
      renderMode: 'led-matrix',
      fontFamily: 'Orbitron',
      glowIntensity: 8,
      dotSize: 7,
      dotGap: 2,
    },
  },
  {
    id: 't-2',
    category: '應援',
    label: '偶像安可 ENCORE',
    text: '★ ENCORE! 安可!! ★',
    config: {
      colorPreset: 'rainbow',
      textColor: '#ec4899',
      fontSize: 84,
      speed: 6,
      direction: 'left',
      renderMode: 'led-matrix',
      fontFamily: 'Noto Sans TC',
      glowIntensity: 10,
      dotSize: 8,
      dotGap: 2,
    },
  },
  {
    id: 't-3',
    category: '應援',
    label: '愛心應援 看這邊',
    text: '♥ 永遠支援你！看這邊 ♥',
    config: {
      colorPreset: 'hot-pink',
      textColor: '#f43f5e',
      fontSize: 68,
      speed: 5,
      direction: 'left',
      renderMode: 'neon-glow',
      fontFamily: 'Noto Sans TC',
      glowIntensity: 9,
    },
  },
  {
    id: 't-4',
    category: '接機',
    label: '國際接機 Welcome',
    text: '✈️ WELCOME TO TAIWAN ✈️',
    config: {
      colorPreset: 'cyber-cyan',
      textColor: '#06b6d4',
      fontSize: 64,
      speed: 4,
      direction: 'left',
      renderMode: 'led-matrix',
      fontFamily: 'Orbitron',
      glowIntensity: 7,
      dotSize: 7,
      dotGap: 2,
    },
  },
  {
    id: 't-5',
    category: '日常',
    label: '計程車 TAXI',
    text: 'TAXI 🚕 空車搭乘',
    config: {
      colorPreset: 'amber-gold',
      textColor: '#fbbf24',
      fontSize: 80,
      speed: 3,
      direction: 'static',
      renderMode: 'led-matrix',
      fontFamily: 'Noto Sans TC',
      glowIntensity: 8,
      dotSize: 8,
      dotGap: 2,
      isBlinking: true,
      blinkSpeed: 1,
    },
  },
  {
    id: 't-6',
    category: '派對',
    label: '生日派對慶祝',
    text: '🎉 HAPPY BIRTHDAY 生日快樂 🎂',
    config: {
      colorPreset: 'rainbow',
      textColor: '#a855f7',
      fontSize: 70,
      speed: 5,
      direction: 'left',
      renderMode: 'neon-glow',
      fontFamily: 'Noto Sans TC',
      glowIntensity: 9,
    },
  },
  {
    id: 't-7',
    category: '派對',
    label: '夜店乾杯嗨翻',
    text: '🍻 SHOTS SHOTS! 今晚不醉不歸 🥂',
    config: {
      colorPreset: 'electric-lime',
      textColor: '#84cc16',
      fontSize: 74,
      speed: 7,
      direction: 'bounce',
      renderMode: 'led-matrix',
      fontFamily: 'Orbitron',
      glowIntensity: 9,
      dotSize: 7,
      dotGap: 2,
    },
  },
  {
    id: 't-8',
    category: '表白',
    label: '浪漫心動告白',
    text: '♥ 做我女朋友好嗎？♥',
    config: {
      colorPreset: 'hot-pink',
      textColor: '#fb7185',
      fontSize: 76,
      speed: 3,
      direction: 'blink',
      renderMode: 'neon-glow',
      fontFamily: 'Noto Sans TC',
      glowIntensity: 10,
      isBlinking: true,
      blinkSpeed: 1,
    },
  },
];

import { translations, SupportedLanguage } from '../i18n/translations';

interface TemplatePickerProps {
  onSelectTemplate: (template: PresetTemplate) => void;
  activeTemplateId?: string;
  lang?: SupportedLanguage;
}

export const TemplatePicker: React.FC<TemplatePickerProps> = ({
  onSelectTemplate,
  activeTemplateId,
  lang = 'zh-TW',
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: t.catAll },
    { id: '應援', label: t.catConcert },
    { id: '接機', label: t.catAirport },
    { id: '派對', label: t.catParty },
    { id: '日常', label: t.catDaily },
    { id: '表白', label: t.catLove },
  ];

  const filtered = PRESET_TEMPLATES.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case '應援': return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
      case '接機': return <Plane className="w-3.5 h-3.5 text-cyan-400" />;
      case '派對': return <PartyPopper className="w-3.5 h-3.5 text-amber-400" />;
      case '日常': return <Car className="w-3.5 h-3.5 text-lime-400" />;
      case '表白': return <Heart className="w-3.5 h-3.5 text-rose-400" />;
      default: return null;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case '應援': return t.catConcert;
      case '接機': return t.catAirport;
      case '派對': return t.catParty;
      case '日常': return t.catDaily;
      case '表白': return t.catLove;
      default: return cat;
    }
  };

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
      {/* Category segmented filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === cat.id
                ? 'bg-zinc-100 text-zinc-900 font-semibold'
                : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of templates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {filtered.map((item) => {
          const isActive = activeTemplateId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTemplate(item)}
              className={`p-3 rounded-xl border text-left transition-all group ${
                isActive
                  ? 'bg-pink-500/10 border-pink-500 shadow-sm shadow-pink-500/10'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
                  {getCategoryIcon(item.category)}
                  {getCategoryLabel(item.category)}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {getRenderModeShort(item.config.renderMode)}
                </span>
              </div>
              <p className="text-xs font-semibold text-zinc-100 truncate group-hover:text-pink-300 transition-colors">
                {item.label}
              </p>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                {item.text}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
