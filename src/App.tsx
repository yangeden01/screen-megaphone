import React, { useState, useEffect } from 'react';
import { BannerConfig, PresetTemplate } from './types/banner';
import { MarqueeCanvas } from './components/MarqueeCanvas';
import { FullscreenDisplay } from './components/FullscreenDisplay';
import { EditorControls } from './components/EditorControls';
import { TemplatePicker } from './components/TemplatePicker';
import { SavedBanners } from './components/SavedBanners';
import { PublishGuideModal } from './components/PublishGuideModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { AdBanner } from './components/AdBanner';
import { AdInterstitialModal } from './components/AdInterstitialModal';
import { 
  Maximize2, 
  Sparkles, 
  Sliders, 
  Bookmark, 
  HelpCircle, 
  Smartphone, 
  Share2,
  Play,
  RotateCcw,
  Check,
  Globe
} from 'lucide-react';
import { translations, detectBrowserLanguage, SupportedLanguage } from './i18n/translations';

const INITIAL_CONFIG: BannerConfig = {
  id: 'current',
  text: 'Hello World ✨ 偶像最棒！',
  fontSize: 72,
  speed: 4,
  direction: 'left',
  renderMode: 'led-matrix',
  fontFamily: 'Orbitron',
  textColor: '#f59e0b',
  colorPreset: 'amber-gold',
  backgroundColor: '#09090b',
  glowIntensity: 8,
  isBlinking: false,
  blinkSpeed: 1,
  isMirrored: false,
  hasBorder: true,
  borderColor: '#38bdf8',
  dotSize: 7,
  dotGap: 2,
};

export default function App() {
  const [config, setConfig] = useState<BannerConfig>(() => {
    try {
      const saved = localStorage.getItem('led_marquee_config');
      return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [isFullscreen, setIsFullscreen] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('play') === 'true' || params.get('fullscreen') === 'true';
    } catch {
      return false;
    }
  });
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'saved'>('editor');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('led_app_lang');
      if (saved && ['zh-TW', 'en', 'ja', 'ko', 'zh-CN'].includes(saved)) {
        return saved as SupportedLanguage;
      }
    } catch {}
    return detectBrowserLanguage();
  });

  const t = translations[currentLang];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('led_app_lang', lang);
    } catch {}
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    // Trigger interstitial ad demo when exiting fullscreen mode
    setShowInterstitialAd(true);
  };

  // Automatically switch to full-screen display when phone is turned horizontally (landscape)
  useEffect(() => {
    const handleOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      if (isLandscape) {
        setIsFullscreen(true);
      }
    };

    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleOrientation, 150);
      setTimeout(handleOrientation, 350);
    });

    if (window.innerWidth > window.innerHeight) {
      setIsFullscreen(true);
    }

    return () => {
      window.removeEventListener('resize', handleOrientation);
    };
  }, []);

  // Saved banners list
  const [savedList, setSavedList] = useState<BannerConfig[]>(() => {
    try {
      const stored = localStorage.getItem('led_marquee_saved_list');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        ...INITIAL_CONFIG,
        id: 'saved-1',
        text: 'Hello World 🌟',
      },
      {
        ...INITIAL_CONFIG,
        id: 'saved-2',
        text: '★ ENCORE! 安可!! ★',
        colorPreset: 'rainbow',
        textColor: '#ec4899',
        fontSize: 84,
        speed: 6,
      },
      {
        ...INITIAL_CONFIG,
        id: 'saved-3',
        text: 'TAXI 🚕 請搭乘',
        direction: 'static',
        isBlinking: true,
      },
    ];
  });

  // Save config to local storage
  useEffect(() => {
    try {
      localStorage.setItem('led_marquee_config', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  // Save list to local storage
  useEffect(() => {
    try {
      localStorage.setItem('led_marquee_saved_list', JSON.stringify(savedList));
    } catch {
      // ignore
    }
  }, [savedList]);

  // Keyboard shortcut: 'F' for fullscreen, 'Space' for pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateConfig = (partial: Partial<BannerConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleSelectTemplate = (template: PresetTemplate) => {
    setConfig((prev) => ({
      ...prev,
      text: template.text,
      ...template.config,
    }));
  };

  const handleSaveCurrent = () => {
    const newItem: BannerConfig = {
      ...config,
      id: `saved-${Date.now()}`,
    };
    setSavedList((prev) => [newItem, ...prev]);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  const isCurrentSaved = savedList.some(
    (item) => item.text.trim() === config.text.trim() && item.colorPreset === config.colorPreset
  );

  const handleShareLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white pb-20 md:pb-12">
      {/* Top Bar following Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 p-0.5 shadow-md shadow-pink-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center">
              <span className="text-[10px] sm:text-[11px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">
                LED
              </span>
            </div>
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-100 whitespace-nowrap">
            {t.appName}
          </span>
        </div>

        {/* Zone 2: 4 single-line concise navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab('editor')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'editor' ? 'text-zinc-100 font-semibold' : 'hover:text-zinc-200'
            }`}
          >
            {t.tabEditor}
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'templates' ? 'text-zinc-100 font-semibold' : 'hover:text-zinc-200'
            }`}
          >
            {t.tabTemplates}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'saved' ? 'text-zinc-100 font-semibold' : 'hover:text-zinc-200'
            }`}
          >
            {t.tabSaved}
          </button>
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="text-pink-400 hover:text-pink-300 transition-colors whitespace-nowrap shrink-0 font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.tabMonetization}
          </button>
        </nav>

        {/* Zone 3: Primary action + Language Switcher + PWA Install */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
              aria-label={t.switchLanguage}
              className="bg-transparent text-[11px] sm:text-xs text-zinc-200 focus:outline-none cursor-pointer pr-0.5"
            >
              <option value="zh-TW" className="bg-zinc-900 text-zinc-100">繁體中文</option>
              <option value="en" className="bg-zinc-900 text-zinc-100">English</option>
              <option value="ja" className="bg-zinc-900 text-zinc-100">日本語</option>
              <option value="ko" className="bg-zinc-900 text-zinc-100">한국어</option>
              <option value="zh-CN" className="bg-zinc-900 text-zinc-100">简体中文</option>
            </select>
          </div>

          <PWAInstallButton />

          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold shadow-lg shadow-pink-600/25 transition active:scale-95 whitespace-nowrap shrink-0"
            title={t.openFullscreen}
          >
            <Maximize2 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.openFullscreen}</span>
            <span className="sm:hidden">全螢幕</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-5 md:py-8 space-y-6">
        {/* Real-time Stadium / Phone Live Preview Banner */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
              <Smartphone className="w-3.5 h-3.5 text-pink-400" />
              {t.previewTitle}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareLink}
                className="hover:text-zinc-200 flex items-center gap-1 transition"
                title={t.shareBanner}
              >
                {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedShare ? t.copied : t.shareBanner}</span>
              </button>
              <button
                onClick={() => setConfig(INITIAL_CONFIG)}
                className="hover:text-zinc-200 flex items-center gap-1 transition"
                title={t.reset}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.reset}</span>
              </button>
            </div>
          </div>

          {/* Electronic Billboard Frame */}
          <div className="relative group rounded-2xl md:rounded-3xl p-2.5 md:p-3 bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
            {/* Outer simulated bezel texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/40 via-transparent to-zinc-950/60 pointer-events-none rounded-2xl md:rounded-3xl" />

            {/* Canvas viewport container */}
            <div className="relative h-44 sm:h-56 md:h-72 w-full rounded-xl md:rounded-2xl overflow-hidden bg-black border border-zinc-800/90 shadow-inner">
              <MarqueeCanvas config={config} />

              {/* Fast Fullscreen Button Hover Badge */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-pink-600/90 hover:bg-pink-500 text-white text-xs font-medium backdrop-blur-md shadow-lg flex items-center gap-1.5 transition active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>滿版應援</span>
              </button>
            </div>
          </div>
        </section>

        {/* Workspace Mode Tabs (Mobile & Desktop) */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'editor'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            彈幕樣式調整
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'templates'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            熱門場景範本
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            常用收藏 ({savedList.length})
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-zinc-925/70 rounded-2xl border border-zinc-800/80 p-4 md:p-6 shadow-xl">
          {activeTab === 'editor' && (
            <EditorControls config={config} onChange={handleUpdateConfig} lang={currentLang} />
          )}

          {activeTab === 'templates' && (
            <TemplatePicker
              onSelectTemplate={(t) => {
                handleSelectTemplate(t);
                setActiveTab('editor');
              }}
            />
          )}

          {activeTab === 'saved' && (
            <SavedBanners
              savedList={savedList}
              onSelect={(item) => {
                setConfig(item);
                setActiveTab('editor');
              }}
              onDelete={handleDeleteSaved}
              onSaveCurrent={handleSaveCurrent}
              isCurrentSaved={isCurrentSaved}
            />
          )}
        </div>

        {/* Bottom Banner Ad Placement */}
        <AdBanner />

        {/* Value Proposition Callout Card: Answering the user's inquiry */}
        <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-zinc-900 to-cyan-500/10 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <span>想將《螢幕大聲公》上架 Google Play？</span>
              <span className="text-[11px] font-normal text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                可行性 100%
              </span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              《螢幕大聲公》已內建完整 PWA 規格，可透過 Google 官方 Bubblewrap 工具免寫 Java 快速打包為 AAB 上傳 Google Play Console，享有千萬級 ASO 自然搜尋流量與廣告收益！
            </p>
          </div>
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 whitespace-nowrap shrink-0 transition"
          >
            檢視上架與變現指南 →
          </button>
        </div>
      </main>

      {/* Mobile Sticky Bottom CTA Bar (<15% viewport height cap) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 md:hidden z-30 flex items-center gap-2.5">
        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 text-xs"
          title="上架諮詢"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsFullscreen(true)}
          className="flex-1 h-11 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/25 active:scale-[0.98] transition"
        >
          <Maximize2 className="w-4 h-4" />
          <span>{t.openFullscreen}</span>
        </button>
      </div>

      {/* Fullscreen Overlay Mode */}
      {isFullscreen && (
        <FullscreenDisplay
          config={config}
          onClose={handleCloseFullscreen}
          onUpdateConfig={handleUpdateConfig}
          lang={currentLang}
        />
      )}

      {/* Interstitial Ad Simulation Modal on exit fullscreen */}
      <AdInterstitialModal
        isOpen={showInterstitialAd}
        onClose={() => setShowInterstitialAd(false)}
      />

      {/* Publish & Monetization Guide Modal */}
      <PublishGuideModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
}
