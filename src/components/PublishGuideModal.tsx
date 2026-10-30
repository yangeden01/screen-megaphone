import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Rocket, 
  DollarSign, 
  Layers, 
  Copy, 
  Check, 
  TrendingUp, 
  AlertCircle,
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface PublishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishGuideModal: React.FC<PublishGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'opportunity' | 'twa' | 'checklist' | 'monetization'>('opportunity');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const bubblewrapCommand = `# 1. 安裝 Google 官方 Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. 透過本 PWA 的 manifest 進行一鍵初始化專案
bubblewrap init --manifest https://你的網域/manifest.webmanifest

# 3. 編譯生成 Google Play 專用的 Android App Bundle (.aab)
bubblewrap build

# 產出的 app-release-signed.aab 即可直接上傳至 Google Play Console！`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                Google Play 上架與商業變現全指南
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                解答：《螢幕大聲公》（手持彈幕）上架 Google Play 之商業機會與技術路徑
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 md:px-6 pt-3 border-b border-zinc-800 bg-zinc-900/50 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('opportunity')}
            className={`pb-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'opportunity'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            1. 市場機會分析
          </button>
          <button
            onClick={() => setActiveTab('twa')}
            className={`pb-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'twa'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            2. PWA 免寫 Java 打包
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            3. Google Play 審核步驟
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`pb-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'monetization'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            4. 廣告與盈利模式
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4 text-sm text-zinc-300">
          {/* TAB 1: OPPORTUNITY */}
          {activeTab === 'opportunity' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-pink-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">
                      結論：機會非常大！屬於高自然流量（ASO）長青品類
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      如您附圖中的《手持彈幕》由 Sunfire Inc. 開發，單一 App 就有超過 <strong>11 萬則評論</strong>、<strong>4.9 顆星極高好評</strong>，預估全球累計下載量數千萬次。這證明手持彈幕具有極高的市場剛需。
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                  <span className="text-xs font-semibold text-pink-400 block mb-1">
                    🎤 高頻且剛性的使用場景
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    演唱會與音樂祭粉絲搶眼應援、機場/車站接機、夜店派對打 Call、計程車招攬、嘈雜環境無聲溝通。
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                  <span className="text-xs font-semibold text-cyan-400 block mb-1">
                    ⚡ 零伺服器成本架構
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    所有點陣矩陣運算與發光效果皆在手機用戶端 Canvas 本地渲染，無需高額伺服器雲端運算費用，毛利率近 100%。
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                  <span className="text-xs font-semibold text-amber-400 block mb-1">
                    🔍 ASO 自然搜尋關鍵字
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    使用者常搜尋「LED 彈幕」、「手持跑馬燈」、「應援螢幕」、「LED Banner」，只要做好多國語言（繁中/簡中/英文/日文/韓文），全球自然下載量極高。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TWA PACKAGING */}
          {activeTab === 'twa' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                本專案已經完全配置了 <strong>PWA 標準規格</strong>（Service Worker、Web App Manifest、192/512/Maskable 圖示、螢幕常亮 Wake Lock API）。
                您完全不需要重新學習寫原生 Kotlin/Java，使用 Google 官方的 <strong>Trusted Web Activity (TWA)</strong> 即可在 15 分鐘內生成 Android 安裝包！
              </p>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs">
                  <div className="flex items-center justify-between text-zinc-400 mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-pink-400 font-semibold">GitHub Actions 免本機環境雲端自動編譯 AAB</span>
                  </div>
                  <p className="text-zinc-400 font-sans text-xs mb-2 leading-relaxed">
                    本專案已為您配置好 <code>.github/workflows/build-android-aab.yml</code>。<br />
                    當您將此專案推送到 GitHub 後，GitHub 雲端機器人會<strong>自動編譯產生 Google Play 專用的 AAB 檔案</strong>！
                  </p>
                  <ol className="text-zinc-300 font-sans text-xs space-y-1 list-decimal list-inside">
                    <li>在 GitHub 倉庫點擊頂部 <strong>「Actions」</strong> 分頁。</li>
                    <li>選擇 <strong>「Build Android AAB」</strong> 工作流。</li>
                    <li>點擊 <strong>「Run workflow」</strong>（或每次 push 會自動觸發）。</li>
                    <li>完成後，在 <strong>Artifacts</strong> 即可直接下載 <code>screen-megaphone-google-play-aab</code> 與可以直接安裝測試的 APK！</li>
                  </ol>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs">
                  <div className="flex items-center justify-between text-zinc-400 mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-cyan-400 font-semibold">亦可選擇本機 CLI 手動打包</span>
                    <button
                      onClick={() => handleCopy(bubblewrapCommand, 'cmd')}
                      className="flex items-center gap-1 text-[11px] hover:text-white transition"
                    >
                      {copiedSnippet === 'cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSnippet === 'cmd' ? '已複製' : '複製指令'}
                    </button>
                  </div>
                  <pre className="text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {bubblewrapCommand}
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                  <strong>💡 核心優勢：</strong>
                  透過 TWA 打包的 App，日後只要您更新網頁端的樣式、新字體或應援功能，所有 Google Play 安裝了此 App 的手機都會<strong>即時自動更新</strong>，完全省去重複提交 Google 審核的漫長等待！
                </div>
              </div>
            )}

          {/* TAB 3: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-200">
                Google Play Console 上架審查清單
              </h3>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-200">1. Google Play 開發者帳號註冊</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      前往 Google Play Console 註冊，需一次性支付 25 美元註冊費（終身有效）。
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-200">2. 個人帳號 14 天封閉測試規定 (2023年起新規)</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      個人開發者帳號需邀請至少 20 位測試者持續參與封閉測試 14 天後即可申請公開發布（亦可選擇以公司/企業帳號上架，免除 20 人測試）。
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-200">3. 商店圖形資產準備 (Store Assets)</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      • 應用圖示 (Icon): 512 x 512 px PNG (本專案已自動生成)<br />
                      • 置頂大圖 (Feature Graphic): 1024 x 500 px (展示手持應援氛圍)<br />
                      • 螢幕截圖: 至少 2 張手機橫向/直向截圖。
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-200">4. 隱私權政策 (Privacy Policy)</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      因為手持彈幕不需要收集用戶個資（無註冊無帳密），隱私權政策非常簡單，填寫標準純工具宣告即可極速通過審核。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MONETIZATION */}
          {activeTab === 'monetization' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2 text-pink-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs font-semibold">1. 廣告 3 大黃金埋點位置</span>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-pink-400 font-bold">①</span>
                      <div>
                        <strong className="text-zinc-200">主畫面底部橫幅 (Banner)：</strong>
                        在編輯器最下方常駐（即目前的 AdBanner 位），進入全螢幕手持時自動隱藏，維持純黑沉浸效果。
                      </div>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-pink-400 font-bold">②</span>
                      <div>
                        <strong className="text-zinc-200">退出全螢幕時插頁廣告 (Interstitial) ★主力：</strong>
                        埋在 <code>handleCloseFullscreen</code> 函式中。當用戶舉牌應援結束放下手機時觸發 5 秒可跳過廣告，千次展示收益（eCPM）高達 $4~$12 美元！
                      </div>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-pink-400 font-bold">③</span>
                      <div>
                        <strong className="text-zinc-200">解鎖進階動效激勵影片 (Rewarded Video)：</strong>
                        觀看 15-30 秒影片廣告，免費解鎖 24 小時限定發光特效或字體。
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-semibold">2. 廣告代碼替換步驟</span>
                  </div>
                  <div className="text-xs text-zinc-400 space-y-2">
                    <p>
                      <strong>網頁 / PWA 模式：</strong>
                      在 <code>index.html</code> 的 <code>&lt;head&gt;</code> 填入您的 Google AdSense / AdMob 腳本：
                    </p>
                    <pre className="p-2 bg-zinc-950 rounded border border-zinc-800 font-mono text-[10px] text-zinc-300 overflow-x-auto whitespace-pre-wrap">
{`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-您的發布商ID" crossorigin="anonymous"></script>`}
                    </pre>
                    <p>
                      <strong>Android App (Google Play) 模式：</strong>
                      使用 Capacitor 或 TWA 原生 AdMob 插件，在 Android 原生層呼叫 <code>AdMob.showInterstitial()</code> 與 <code>AdMob.showBanner()</code>。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                <strong>現狀：</strong>本專案已在 <code>src/components/AdBanner.tsx</code> 與 <code>src/components/AdInterstitialModal.tsx</code> 中完整預留廣告插槽與展示邏輯，您現在點擊全螢幕應援後再關閉，即可立即體驗插頁廣告的觸發效果！
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="text-xs text-zinc-500 hidden sm:block">
            點擊關閉即可返回彈幕編輯與全螢幕體驗
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-medium transition"
          >
            我知道了，關閉指南
          </button>
        </div>
      </div>
    </div>
  );
};
