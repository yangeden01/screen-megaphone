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
  const [activeTab, setActiveTab] = useState<'opportunity' | 'twa' | 'checklist' | 'monetization' | 'downloads' | 'testers'>('testers');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const [postLanguage, setPostLanguage] = useState<'zh' | 'en'>('zh');

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

  const testerPostZh = `【互測互載 14天】Google Play 個人開發者 20人封測互相支援！《螢幕大聲公》必回載並保留 14 天！

各位開發者夥伴大家好！

因應 Google Play 個人帳號上架政策，我的新 App《螢幕大聲公 - 超亮 LED 手持彈幕》目前正在進行封閉測試，急需 20 位熱心夥伴協助測試並保留 14 天。

只要您在底下留言貼出您的 App 連結或截圖，我保證一定「互載互測、五星好評、持續保留至少 14 天不卸載」！

---

📱 參與封測 3 步驟（請務必依序點擊）：

1. 第一步：加入 Google 測試群組（取得測試資格）
👉 https://groups.google.com/g/screen-megaphone-testers
(點進去登入 Google 帳號，並點擊「加入群組」)

2. 第二步：點擊測試邀請網址（點擊「成為測試人員」）
👉 https://play.google.com/apps/testing/com.screenmegaphone.ledbanner
(⚠️ 非常重要！請務必點進去並按下【成為測試人員】，否則商店會顯示「找不到項目」)

3. 第三步：前往 Google Play 商店下載安裝
👉 https://play.google.com/store/apps/details?id=com.screenmegaphone.ledbanner
(或由第二步網頁中的「在 Google Play 下載」直接跳轉安裝)

---

🤝 誠信互助承諾：
- 留言後我會在 12 小時內完成下載您的 App、測試並在留言區回傳手機安裝截圖。
- 測試期間絕不卸載，每天主動開起來幫忙維持活躍度，協助大家一起順利通過 14 天門檻、成功正式上架！

感謝大家互相幫忙，祝大家的 App 都能順利過審上線！🎉`;

  const testerPostEn = `[Test for Test / Mutual 14 Days] Need 20 testers for Screen Megaphone (Ultra-Bright LED Scroller). Will test back immediately & keep installed 14+ days!

Hi fellow developers!

To meet Google Play's 20-tester / 14-day closed testing requirement, I need 20 testers for my new app: **Screen Megaphone - LED Scroller & Cheer Banner**.

I will gladly **test your app back, leave a 5-star review, and keep it installed for more than 14 days**!

---

📱 How to join the closed test (3 quick steps):

1. Step 1: Join the Google Group (Required for tester access)
👉 https://groups.google.com/g/screen-megaphone-testers
(Sign in with your Google account and click "Join group")

2. Step 2: Accept Test Invitation (Web Opt-in - Crucial!)
👉 https://play.google.com/apps/testing/com.screenmegaphone.ledbanner
(⚠️ Important: Please click "Become a Tester" first, otherwise Google Play Store will show "Item not found")

3. Step 3: Download and install from Google Play Store
👉 https://play.google.com/store/apps/details?id=com.screenmegaphone.ledbanner
(Or click "Download it on Google Play" directly from the opt-in page)

---

🤝 My Guarantee & Mutual Testing Commitment:
- Drop your Google Group / Web Opt-in / Store link or screenshot in the comments below!
- I will install your app within 12 hours and reply with an installed proof screenshot + review.
- I will keep your app installed for 14+ days and open it regularly to keep active.

Thank you all for the mutual support! Let's get our apps published together! 🎉`;

  const activeTesterPost = postLanguage === 'zh' ? testerPostZh : testerPostEn;

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
          <button
            onClick={() => setActiveTab('downloads')}
            className={`pb-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'downloads'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-emerald-500/80 hover:text-emerald-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            5. 安裝包與 APK 畫面說明
          </button>
          <button
            onClick={() => setActiveTab('testers')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'testers'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-amber-400/80 hover:text-amber-300'
            }`}
          >
            🔥 6. 20人封測招募文案（一鍵複製）
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

          {/* TAB 5: DOWNLOADS & APK SCREEN GUIDE */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-zinc-900 to-cyan-500/15 border border-emerald-500/30">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">
                      Android 安裝檔已編譯完成並全數通過數位簽名
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      GitHub Actions 已於最新輪次成功建置產出，包含直接在 Android 手機點擊安裝測試的 <strong>.apk 檔案</strong>，以及上傳至 Google Play Console 發布用的 <strong>.aab 檔案</strong>。
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href="https://github.com/yangeden01/screen-megaphone/actions/runs/42486453974"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold text-xs transition"
                      >
                        前往 GitHub Actions 下載最新 APK / AAB
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* APK App Screen Flow */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-pink-400" />
                  APK 安裝後的手機開啟畫面與操作流程
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800 space-y-1.5">
                    <span className="font-semibold text-pink-400 block">
                      1. 啟動進入「彈幕主工作台」
                    </span>
                    <p className="text-zinc-400 leading-relaxed">
                      點擊桌面圖示後，App 將以全黑霓虹啟動畫面迅速進入主頁面。頂部即時預覽 LED 點陣滾動效果，下方提供即時字體、顏色、霓虹發光、點陣顆粒大小等調校面板。
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800 space-y-1.5">
                    <span className="font-semibold text-emerald-400 block">
                      2. 點擊「全螢幕播放」進入應援模式
                    </span>
                    <p className="text-zinc-400 leading-relaxed">
                      點擊底部的「全螢幕播放」按鈕，手機自動進入橫向全螢幕無干擾模式，操作面板完全隱藏，化身超亮手持應援燈牌。
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800 space-y-1.5">
                    <span className="font-semibold text-cyan-400 block">
                      3. 自動常亮防休眠（Wake Lock）
                    </span>
                    <p className="text-zinc-400 leading-relaxed">
                      在全螢幕模式下已內建智慧螢幕鎖定，長時間手持應援、接機或擺在車窗前，螢幕均不會因為逾時而變暗或自動休眠。
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-800 space-y-1.5">
                    <span className="font-semibold text-amber-400 block">
                      4. 輕觸螢幕隨時喚出控制選單
                    </span>
                    <p className="text-zinc-400 leading-relaxed">
                      全螢幕播放中，只需點擊螢幕任何位置，即可叫出浮動工具列（退出全螢幕、暫停/繼續滾動、微調滾動速度），操作極具直覺性。
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700/80 space-y-2 text-xs">
                  <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    無頂部網址列（Digital Asset Links 已配置）
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    我們已在 <code>/.well-known/assetlinks.json</code> 完成與 APK 數位簽名（SHA-256）的綁定，當 APK 在支援的 Android 手機上執行時，將直接以純原生全螢幕呈現，不會帶有任何 Chrome 瀏覽器頂部網址列。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TESTERS RECRUITMENT POST */}
          {activeTab === 'testers' && (
            <div className="space-y-4">
              {/* Language Switcher & Copy Header */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-amber-300">
                      🔥 20人封測互相支援招募文案
                    </h3>
                    {/* Language Pills */}
                    <div className="inline-flex rounded-lg bg-zinc-800 p-0.5 border border-zinc-700">
                      <button
                        onClick={() => setPostLanguage('zh')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                          postLanguage === 'zh'
                            ? 'bg-amber-500 text-black shadow'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        繁體中文
                      </button>
                      <button
                        onClick={() => setPostLanguage('en')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                          postLanguage === 'en'
                            ? 'bg-cyan-500 text-black shadow'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        English (Reddit)
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {postLanguage === 'zh'
                      ? '已校正「先入群組 ➔ 再點受邀啟用 ➔ 最後開商店下載」3 步驟，避免夥伴遇到「找不到項目」錯誤。'
                      : 'Optimized for Reddit r/AndroidClosedTesting, Discord & global developer testing groups.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(activeTesterPost, 'full-post')}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition shadow-lg ${
                      copiedSnippet === 'full-post'
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : postLanguage === 'zh'
                        ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20'
                    }`}
                  >
                    {copiedSnippet === 'full-post' ? (
                      <>
                        <Check className="w-4 h-4" />
                        已複製成功！
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        一鍵複製{postLanguage === 'zh' ? '中文' : '英文'}貼文
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Reddit Recommendations when English is chosen */}
              {postLanguage === 'en' && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-start gap-2.5">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-300 font-bold shrink-0 text-[10px]">REDDIT</div>
                  <div className="space-y-1">
                    <div className="font-semibold text-cyan-300">海外發文推薦社群：</div>
                    <div className="text-[11px] text-zinc-300">
                      1. <a href="https://www.reddit.com/r/AndroidClosedTesting/" target="_blank" rel="noreferrer" className="underline hover:text-cyan-400">Reddit r/AndroidClosedTesting</a>（全球最大互測板，貼上此文通常 1-2 天內集滿 20 人）<br />
                      2. <a href="https://www.reddit.com/r/playstoretesters/" target="_blank" rel="noreferrer" className="underline hover:text-cyan-400">Reddit r/playstoretesters</a>
                    </div>
                  </div>
                </div>
              )}

              {/* Individual quick copy links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-zinc-400">步驟 1：測試群組網址</div>
                    <div className="text-xs text-zinc-200 truncate">screen-megaphone-testers</div>
                  </div>
                  <button
                    onClick={() => handleCopy('https://groups.google.com/g/screen-megaphone-testers', 'link-1')}
                    className="p-1.5 rounded-lg bg-zinc-700/60 hover:bg-zinc-700 text-zinc-300 transition shrink-0"
                    title="複製群組連結"
                  >
                    {copiedSnippet === 'link-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-amber-400">步驟 2：測試受邀網址 (必點)</div>
                    <div className="text-xs text-zinc-200 truncate">apps/testing/com.screenmegaphone...</div>
                  </div>
                  <button
                    onClick={() => handleCopy('https://play.google.com/apps/testing/com.screenmegaphone.ledbanner', 'link-2')}
                    className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition shrink-0"
                    title="複製受邀啟用連結"
                  >
                    {copiedSnippet === 'link-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-zinc-400">步驟 3：商店下載網址</div>
                    <div className="text-xs text-zinc-200 truncate">store/apps/details?id=...</div>
                  </div>
                  <button
                    onClick={() => handleCopy('https://play.google.com/store/apps/details?id=com.screenmegaphone.ledbanner', 'link-3')}
                    className="p-1.5 rounded-lg bg-zinc-700/60 hover:bg-zinc-700 text-zinc-300 transition shrink-0"
                    title="複製商店下載連結"
                  >
                    {copiedSnippet === 'link-3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Text Area Preview */}
              <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {activeTesterPost}
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
