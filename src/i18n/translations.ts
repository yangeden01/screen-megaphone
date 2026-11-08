export type SupportedLanguage = 'zh-TW' | 'en' | 'ja' | 'ko' | 'zh-CN';

export interface Translations {
  appName: string;
  appSubtitle: string;
  openFullscreen: string;
  previewTitle: string;
  shareBanner: string;
  copied: string;
  reset: string;
  defaultText: string;
  // Tabs
  tabEditor: string;
  tabTemplates: string;
  tabSaved: string;
  tabMonetization: string;
  // Editor inputs
  inputPlaceholder: string;
  quickTags: {
    encore: string;
    cheer: string;
    love: string;
    welcome: string;
    taxi: string;
    sos: string;
  };
  fontSize: string;
  scrollSpeed: string;
  glowIntensity: string;
  dotSize: string;
  dotGap: string;
  // Directions
  direction: string;
  dirLeft: string;
  dirRight: string;
  dirStatic: string;
  dirBlink: string;
  dirBounce: string;
  // Display styles
  displayStyle: string;
  styleLedMatrix: string;
  styleNeonGlow: string;
  styleOutline: string;
  stylePixelArt?: string;
  styleClean: string;
  // Colors & Presets
  colorPreset: string;
  colorAmber: string;
  colorRainbow: string;
  colorCyan: string;
  colorPink: string;
  colorLime: string;
  colorPolice: string;
  colorWhite: string;
  colorCustom: string;
  // Fonts
  fontFamily: string;
  fontHeavyBold: string;
  fontCalligraphy: string;
  fontCutePop: string;
  fontCyberTech: string;
  // Toggles
  mirrorText: string;
  blinkText: string;
  borderFrame: string;
  saveCurrent: string;
  savedSuccess: string;
  // Fullscreen HUD
  screenAlwaysOn: string;
  holdingSign: string;
  confettiCheer: string;
  toggleLandscape: string;
  exitFullscreen: string;
  paused: string;
  playing: string;
  strobeFlash: string;
  rotateDevicePrompt: string;
  // Categories
  catConcert: string;
  catAirport: string;
  catParty: string;
  catDaily: string;
  catLove: string;
  applyTemplate: string;
  catAll: string;
  // Dynamic UI elements
  fullCheerBanner: string;
  clear: string;
  charsCount: string;
  bannerContent: string;
  customColorHint: string;
  rainbowActive: string;
  fontStyles: string;
  crazyBlink: string;
  mirrorFlip: string;
  neonBorder: string;
  toggleOn: string;
  toggleOff: string;
  mirrorOn: string;
  mirrorOff: string;
  // Language Switcher
  switchLanguage: string;
  // Saved Banners
  savedTitle: string;
  alreadySaved: string;
  saveCurrentBanner: string;
  emptySaved: string;
  noText: string;
  loadAndUse: string;
  delete: string;
  speedLabel: string;
  // PWA Install
  installApp: string;
  addToHomeScreen: string;
  installOnIOS: string;
  iosStep1: string;
  iosStep2: string;
  gotIt: string;
  // Interstitial Ad
  interstitialAd: string;
  closeInSeconds: string;
  skipAd: string;
  vipNoAds: string;
  adDemoDesc: string;
  closeAdReturn: string;
  waitSeconds: string;
  // Bottom Card
  marketCardTitle: string;
  marketCardBadge: string;
  marketCardDesc: string;
  marketCardBtn: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  'zh-TW': {
    appName: '螢幕大聲公',
    appSubtitle: '超亮 LED 手持彈幕 & 演唱會應援跑馬燈',
    openFullscreen: '開啟全螢幕',
    previewTitle: '即時雙向預覽 (點擊畫面可暫停 / 播放)',
    shareBanner: '分享',
    copied: '已複製',
    reset: '重設',
    defaultText: 'HELLO WORLD 🌟 螢幕大聲公',
    tabEditor: '彈幕調校',
    tabTemplates: '熱門應援範本',
    tabSaved: '已收藏彈幕',
    tabMonetization: '上架機會與打包分析',
    inputPlaceholder: '請輸入要滾動播放的彈幕文字...',
    quickTags: {
      encore: '★ ENCORE! 安可!! ★',
      cheer: '🔥 應援打 CALL！',
      love: '💖 我愛你 永遠支持',
      welcome: '✈️ 歡迎抵達 台北',
      taxi: '🚕 TAXI 請搭乘',
      sos: '🚨 請讓路 謝謝！',
    },
    fontSize: '文字字級',
    scrollSpeed: '滾動速度',
    glowIntensity: '霓虹發光強度',
    dotSize: 'LED 點陣顆粒大小',
    dotGap: '點陣間距',
    direction: '滾動方向與動態',
    dirLeft: '向左滾動',
    dirRight: '向右滾動',
    dirStatic: '靜止固定',
    dirBlink: '閃爍交替',
    dirBounce: '左右往返',
    displayStyle: '渲染風格模式',
    styleLedMatrix: '擬真點陣 (LED)',
    styleNeonGlow: '霓虹夜光 (Neon)',
    styleOutline: '雙色立體描邊 (3D Outline)',
    stylePixelArt: '雙色立體描邊 (3D Outline)',
    styleClean: '純淨平滑 (Clean)',
    colorPreset: '色彩主題預設',
    colorAmber: '暖琥珀金',
    colorRainbow: '動態彩虹',
    colorCyan: '科技電光青',
    colorPink: '熱情桃粉',
    colorLime: '螢光電能綠',
    colorPolice: '警鈴紅白藍',
    colorWhite: '冷光極致白',
    colorCustom: '自訂色彩',
    fontFamily: '顯示字體',
    fontHeavyBold: '應援特黑體 (Heavy)',
    fontCalligraphy: '霸氣國潮書 (Brush)',
    fontCutePop: '甜萌元氣圓 (Cute)',
    fontCyberTech: '賽博極速 (Cyber)',
    mirrorText: '鏡像反轉 (自拍鏡頭或車窗專用)',
    blinkText: '閃爍特效',
    borderFrame: '點陣外邊框',
    saveCurrent: '收藏當前彈幕',
    savedSuccess: '已收藏至清單！',
    screenAlwaysOn: '螢幕常亮已開啟',
    holdingSign: '手持應援中',
    confettiCheer: '發送彩色紙花應援',
    toggleLandscape: '切換強制橫向 (免翻轉)',
    exitFullscreen: '退出全螢幕',
    paused: '已暫停',
    playing: '播放中',
    strobeFlash: '閃爍暴閃 (現場打 Call 節奏)',
    rotateDevicePrompt: '手機打橫將自動滿版全螢幕播放',
    catConcert: '應援',
    catAirport: '接機',
    catParty: '派對',
    catDaily: '日常',
    catLove: '表白',
    applyTemplate: '套用此範本',
    catAll: '全部',
    fullCheerBanner: '滿版應援',
    clear: '清空',
    charsCount: '字',
    bannerContent: '彈幕內容 (支援文字與 Emoji)',
    customColorHint: '點擊色塊自選任意色彩',
    rainbowActive: '🌈 動態彩虹中',
    fontStyles: 'LED 字體風格',
    crazyBlink: '狂歡暴閃',
    mirrorFlip: '鏡像反轉',
    neonBorder: '霓虹燈邊框',
    toggleOn: '開啟',
    toggleOff: '關閉',
    mirrorOn: '開啟 (反字)',
    mirrorOff: '正常',
    switchLanguage: '切換語言',
    savedTitle: '常用彈幕收藏庫',
    alreadySaved: '✓ 已在收藏庫',
    saveCurrentBanner: '+ 收藏目前彈幕',
    emptySaved: '尚無收藏的彈幕，編輯完喜歡的內容後可點擊上方按鈕收藏！',
    noText: '(無文字)',
    loadAndUse: '載入並使用',
    delete: '刪除',
    speedLabel: '速度',
    installApp: '安裝 App 到桌面',
    addToHomeScreen: '加到主畫面',
    installOnIOS: '在 iPhone / iPad 上安裝',
    iosStep1: '1. 點擊 Safari 瀏覽器底部的 「分享」 按鈕。',
    iosStep2: '2. 向下滾動並選擇 「加入主畫面」 (Add to Home Screen)。',
    gotIt: '我知道了',
    interstitialAd: '全螢幕插頁廣告 (AdMob Interstitial)',
    closeInSeconds: '秒後可關閉',
    skipAd: '跳過廣告',
    vipNoAds: '《螢幕大聲公》VIP 免廣告權益',
    adDemoDesc: '【這是退出全螢幕手持模式時觸發的插頁廣告示範】\n全螢幕手持持續超過 20 秒才觸發，小於 20 秒不推廣告，避免調整參數時打擾用戶。',
    closeAdReturn: '關閉廣告返回編輯器',
    waitSeconds: '請稍候',
    marketCardTitle: '想將《螢幕大聲公》上架 Google Play？',
    marketCardBadge: '可行性 100%',
    marketCardDesc: '《螢幕大聲公》已內建完整 PWA 規格，可透過 Google 官方 Bubblewrap 工具免寫 Java 快速打包為 AAB 上傳 Google Play Console，享有千萬級 ASO 自然搜尋流量與廣告收益！',
    marketCardBtn: '檢視上架與變現指南 →',
  },
  'en': {
    appName: 'Screen Megaphone',
    appSubtitle: 'Ultra-Bright LED Marquee & Concert Banner',
    openFullscreen: 'Full Screen',
    previewTitle: 'Live Preview (Tap to Pause / Play)',
    shareBanner: 'Share',
    copied: 'Copied',
    reset: 'Reset',
    defaultText: 'HELLO WORLD 🌟 LED MEGAPHONE',
    tabEditor: 'Editor',
    tabTemplates: 'Templates',
    tabSaved: 'Favorites',
    tabMonetization: 'Market Analysis',
    inputPlaceholder: 'Enter scrolling banner message...',
    quickTags: {
      encore: '★ ENCORE! LOUD! ★',
      cheer: '🔥 WE LOVE YOU!',
      love: '💖 YOU ARE AMAZING',
      welcome: '✈️ WELCOME TO TAIPEI',
      taxi: '🚕 TAXI AVAILABLE',
      sos: '🚨 PLEASE MOVE ASIDE',
    },
    fontSize: 'Text Size',
    scrollSpeed: 'Scroll Speed',
    glowIntensity: 'Neon Glow Intensity',
    dotSize: 'LED Dot Size',
    dotGap: 'Matrix Spacing',
    direction: 'Scroll Direction & Motion',
    dirLeft: 'Scroll Left',
    dirRight: 'Scroll Right',
    dirStatic: 'Static Fixed',
    dirBlink: 'Blinking Mode',
    dirBounce: 'Bounce Bumper',
    displayStyle: 'Render Style Mode',
    styleLedMatrix: 'LED Matrix Dots',
    styleNeonGlow: 'Neon Glow',
    styleOutline: '3D Duo Outline',
    stylePixelArt: '3D Duo Outline',
    styleClean: 'Modern Clean',
    colorPreset: 'Color Presets',
    colorAmber: 'Amber Gold',
    colorRainbow: 'Vivid Rainbow',
    colorCyan: 'Cyber Cyan',
    colorPink: 'Hot Pink',
    colorLime: 'Electric Lime',
    colorPolice: 'Police Strobe',
    colorWhite: 'Pure White',
    colorCustom: 'Custom Color',
    fontFamily: 'Display Font',
    fontHeavyBold: 'Impact Heavy',
    fontCalligraphy: 'Brush Calligraphy',
    fontCutePop: 'Cute Pop',
    fontCyberTech: 'Cyber Tech',
    mirrorText: 'Mirror Flip (Selfie / Car Window)',
    blinkText: 'Blink Flash',
    borderFrame: 'Matrix Bezel Border',
    saveCurrent: 'Save to Favorites',
    savedSuccess: 'Saved to favorites!',
    screenAlwaysOn: 'Screen Stay-Awake Active',
    holdingSign: 'Holding Sign Mode',
    confettiCheer: 'Confetti Cannon Cheer',
    toggleLandscape: 'Force Landscape',
    exitFullscreen: 'Exit Fullscreen',
    paused: 'Paused',
    playing: 'Playing',
    strobeFlash: 'Strobe Flash (Rhythm Beat)',
    rotateDevicePrompt: 'Rotate device horizontally for instant edge-to-edge fullscreen',
    catConcert: 'Concert',
    catAirport: 'Airport',
    catParty: 'Party',
    catDaily: 'Daily',
    catLove: 'Love',
    applyTemplate: 'Apply Template',
    catAll: 'All',
    fullCheerBanner: 'Full Banner',
    clear: 'Clear',
    charsCount: 'chars',
    bannerContent: 'Banner Text (Supports Text & Emoji)',
    customColorHint: 'Tap color box to pick any color',
    rainbowActive: '🌈 Animated Rainbow',
    fontStyles: 'LED Font Style',
    crazyBlink: 'Crazy Strobe',
    mirrorFlip: 'Mirror Flip',
    neonBorder: 'Neon Bezel Border',
    toggleOn: 'ON',
    toggleOff: 'OFF',
    mirrorOn: 'ON (Flipped)',
    mirrorOff: 'Normal',
    switchLanguage: 'Language',
    savedTitle: 'Saved Banners',
    alreadySaved: '✓ Saved in Library',
    saveCurrentBanner: '+ Save Current Banner',
    emptySaved: 'No saved banners yet. Click the button above to bookmark your creations!',
    noText: '(No Text)',
    loadAndUse: 'Load & Use',
    delete: 'Delete',
    speedLabel: 'Speed',
    installApp: 'Install App',
    addToHomeScreen: 'Add to Home Screen',
    installOnIOS: 'Install on iPhone / iPad',
    iosStep1: '1. Tap the Share button at the bottom of Safari.',
    iosStep2: '2. Scroll down and tap "Add to Home Screen".',
    gotIt: 'Got It',
    interstitialAd: 'Fullscreen Interstitial Ad (AdMob)',
    closeInSeconds: 's to skip',
    skipAd: 'Skip Ad',
    vipNoAds: 'Screen Megaphone VIP Ad-Free Access',
    adDemoDesc: '[Demo Interstitial Ad shown after exiting full screen]\nOnly triggers when full screen exceeds 20 seconds, preventing interruptions while adjusting settings.',
    closeAdReturn: 'Close Ad & Return to Editor',
    waitSeconds: 'Please wait',
    marketCardTitle: 'Publish Screen Megaphone to Google Play?',
    marketCardBadge: '100% Ready',
    marketCardDesc: 'Screen Megaphone is PWA-compliant and can be packaged into an Android App Bundle (.aab) via Google Bubblewrap CLI without writing Java, unlocking high organic ASO traffic and AdMob revenue!',
    marketCardBtn: 'View Publishing & Monetization Guide →',
  },
  'ja': {
    appName: '画面メガホン',
    appSubtitle: '超高輝度 LED 電光掲示板 & 応援バナー',
    openFullscreen: '全画面表示',
    previewTitle: 'リアルタイムプレビュー (タップで一時停止 / 再生)',
    shareBanner: '共有',
    copied: 'コピー完了',
    reset: 'リセット',
    defaultText: 'HELLO WORLD 🌟 LED MEGAPHONE',
    tabEditor: 'バナー調整',
    tabTemplates: '人気テンプレート',
    tabSaved: '保存済み',
    tabMonetization: '分析',
    inputPlaceholder: '流れるメッセージを入力してください...',
    quickTags: {
      encore: '★ アンコール! ENCORE! ★',
      cheer: '🔥 全力応援中！最高！',
      love: '💖 大好き！ずっと応援してます',
      welcome: '✈️ ようこそ！歓迎',
      taxi: '🚕 TAXI 空車です',
      sos: '🚨 道を開けてください',
    },
    fontSize: 'フォントサイズ',
    scrollSpeed: 'スクロール速度',
    glowIntensity: 'ネオン発光の強さ',
    dotSize: 'LEDドットの大きさ',
    dotGap: 'ドット間隔',
    direction: 'スクロール方向',
    dirLeft: '左へ流れる',
    dirRight: '右へ流れる',
    dirStatic: '静止表示',
    dirBlink: '点滅モード',
    dirBounce: '左右バウンド',
    displayStyle: '表示スタイル',
    styleLedMatrix: 'LED ドットマトリクス',
    styleNeonGlow: 'ネオングロー (発光)',
    styleOutline: '立体アウトライン (3D)',
    stylePixelArt: '立体アウトライン (3D)',
    styleClean: 'クリーン表示',
    colorPreset: 'カラーテーマ',
    colorAmber: 'アンバーゴールド',
    colorRainbow: 'ダイナミックレインボー',
    colorCyan: 'サイバーシアン',
    colorPink: 'ホットピンク',
    colorLime: 'ネオングリーン',
    colorPolice: 'パトランプ点滅',
    colorWhite: 'ピュアホワイト',
    colorCustom: 'カスタムカラー',
    fontFamily: 'フォント選択',
    fontHeavyBold: '応援極太ゴシック',
    fontCalligraphy: '筆文字・書道体',
    fontCutePop: 'ポップ丸文字',
    fontCyberTech: 'サイバーテック',
    mirrorText: 'ミラー反転 (インカメラ・車窓用)',
    blinkText: '点滅エフェクト',
    borderFrame: 'LED 外枠フレーム',
    saveCurrent: 'お気に入りに保存',
    savedSuccess: 'お気に入りに保存しました！',
    screenAlwaysOn: '画面常時点灯オン',
    holdingSign: '応援サインモード中',
    confettiCheer: '紙吹雪エフェクト',
    toggleLandscape: '強制横向き切替',
    exitFullscreen: '全画面を終了',
    paused: '一時停止',
    playing: '再生中',
    strobeFlash: 'ストロボ発光 (ビート連動)',
    rotateDevicePrompt: 'スマホを横に向けると自動で全画面フルサイズ表示になります',
    catConcert: 'ライブ応援',
    catAirport: 'お出迎え',
    catParty: 'パーティー',
    catDaily: '日常',
    catLove: 'メッセージ',
    applyTemplate: 'このテンプレートを適用',
    catAll: 'すべて',
    fullCheerBanner: '全画面応援',
    clear: 'クリア',
    charsCount: '文字',
    bannerContent: 'メッセージ内容 (絵文字対応)',
    customColorHint: 'カラーパレットから自由選択',
    rainbowActive: '🌈 レインボー動作中',
    fontStyles: 'フォントスタイル',
    crazyBlink: 'ストロボ点滅',
    mirrorFlip: 'ミラー反転',
    neonBorder: 'ネオン外枠フレーム',
    toggleOn: 'ON',
    toggleOff: 'OFF',
    mirrorOn: 'ON (反転)',
    mirrorOff: '通常',
    switchLanguage: '言語切替',
    savedTitle: '保存済みバナー一覧',
    alreadySaved: '✓ 保存済み',
    saveCurrentBanner: '+ 現在のバナーを保存',
    emptySaved: '保存されたバナーはありません。作成したバナーを上のボタンから保存しましょう！',
    noText: '(テキストなし)',
    loadAndUse: '読み込んで使用',
    delete: '削除',
    speedLabel: '速度',
    installApp: 'アプリをインストール',
    addToHomeScreen: 'ホーム画面に追加',
    installOnIOS: 'iPhone / iPad でのインストール',
    iosStep1: '1. Safari 下部の「共有」ボタンをタップします。',
    iosStep2: '2. 下にスクロールして「ホーム画面に追加」を選択します。',
    gotIt: '了解しました',
    interstitialAd: '全画面インタースティシャル広告 (AdMob)',
    closeInSeconds: '秒後にスキップ可能',
    skipAd: '広告をスキップ',
    vipNoAds: '「画面メガホン」VIP 広告非表示特典',
    adDemoDesc: '【全画面表示終了時に表示される広告デモ】\n全画面表示が20秒を超えた場合のみ表示され、パラメータ調整中の誤表示を防ぎます。',
    closeAdReturn: '広告を閉じてエディタに戻る',
    waitSeconds: '少々お待ちください',
    marketCardTitle: '「画面メガホン」を Google Play に公開しますか？',
    marketCardBadge: '即時対応 100%',
    marketCardDesc: 'Google 公式 Bubblewrap ツールを利用することで、Java 不要で Android AAB 形式にパッケージングし、Google Play に素早く配信可能です！',
    marketCardBtn: '配信・収益化ガイドを見る →',
  },
  'ko': {
    appName: '화면 메가폰',
    appSubtitle: '초고휘도 LED 전광판 & 콘서트 응원 배너',
    openFullscreen: '전체 화면',
    previewTitle: '실시간 미리보기 (탭하여 일시정지 / 재생)',
    shareBanner: '공유',
    copied: '복사됨',
    reset: '초기화',
    defaultText: 'HELLO WORLD 🌟 LED MEGAPHONE',
    tabEditor: '배너 편집',
    tabTemplates: '인기 템플릿',
    tabSaved: '보관함',
    tabMonetization: '분석',
    inputPlaceholder: '흘러갈 메시지를 입력하세요...',
    quickTags: {
      encore: '★ 앵콜! ENCORE! ★',
      cheer: '🔥 영원히 함께해 사랑해!',
      love: '💖 언제나 응원해 화이팅',
      welcome: '✈️ 한국 방문을 환영합니다',
      taxi: '🚕 TAXI 빈차 탑승하세요',
      sos: '🚨 양보해 주세요 감사합니다',
    },
    fontSize: '글자 크기',
    scrollSpeed: '스크롤 속도',
    glowIntensity: '네온 발광 강도',
    dotSize: 'LED 도트 크기',
    dotGap: '도트 간격',
    direction: '스크롤 방향 및 효과',
    dirLeft: '왼쪽으로 흐름',
    dirRight: '오른쪽으로 흐름',
    dirStatic: '정지 고정',
    dirBlink: '깜빡임 모드',
    dirBounce: '양쪽 바운스',
    displayStyle: '표시 스타일',
    styleLedMatrix: 'LED 도트 매트릭스',
    styleNeonGlow: '네온 글로우',
    styleOutline: '3D 입체 외곽선',
    stylePixelArt: '3D 입체 외곽선',
    styleClean: '깔끔한 모던',
    colorPreset: '컬러 프리셋',
    colorAmber: '앰버 골드',
    colorRainbow: '레인보우 무지개',
    colorCyan: '사이버 시안',
    colorPink: '핫 핑크',
    colorLime: '일렉트릭 라임',
    colorPolice: '경광등 스트로브',
    colorWhite: '퓨어 화이트',
    colorCustom: '사용자 지정 색상',
    fontFamily: '글꼴',
    fontHeavyBold: '임팩트 볼드',
    fontCalligraphy: '붓글씨 캘리',
    fontCutePop: '큐트 팝체',
    fontCyberTech: '사이버 테크',
    mirrorText: '좌우 반전 (셀카 / 차창 전용)',
    blinkText: '깜빡임 효과',
    borderFrame: 'LED 베젤 테두리',
    saveCurrent: '보관함에 저장',
    savedSuccess: '보관함에 저장되었습니다!',
    screenAlwaysOn: '화면 항상 켜짐 활성화',
    holdingSign: '응원 모드 진행 중',
    confettiCheer: '꽃가루 응원 효과',
    toggleLandscape: '가로 화면 고정',
    exitFullscreen: '전체 화면 종료',
    paused: '일시정지됨',
    playing: '재생 중',
    strobeFlash: '스트로브 점멸 (비트 효과)',
    rotateDevicePrompt: '스마트폰을 가로로 돌리면 자동으로 꽉 찬 전체 화면이 됩니다',
    catConcert: '콘서트 응원',
    catAirport: '공항 픽업',
    catParty: '파티/클럽',
    catDaily: '일상',
    catLove: '고백/애정',
    applyTemplate: '템플릿 적용하기',
    catAll: '전체',
    fullCheerBanner: '전체화면 응원',
    clear: '지우기',
    charsCount: '자',
    bannerContent: '전광판 문구 (텍스트 및 이모지 지원)',
    customColorHint: '색상 상자를 눌러 자유롭게 선택',
    rainbowActive: '🌈 레인보우 작동 중',
    fontStyles: '글꼴 스타일',
    crazyBlink: '광란의 점멸',
    mirrorFlip: '좌우 반전',
    neonBorder: '네온 테두리',
    toggleOn: '켜짐',
    toggleOff: '꺼짐',
    mirrorOn: '켜짐 (반전)',
    mirrorOff: '정상',
    switchLanguage: '언어 변경',
    savedTitle: '저장된 전광판 보관함',
    alreadySaved: '✓ 보관함에 저장됨',
    saveCurrentBanner: '+ 현재 전광판 저장',
    emptySaved: '저장된 전광판이 없습니다. 마음에 드는 문구를 작성 후 위 버튼을 눌러 저장하세요!',
    noText: '(텍스트 없음)',
    loadAndUse: '불러와서 사용',
    delete: '삭제',
    speedLabel: '속도',
    installApp: '홈 화면에 앱 설치',
    addToHomeScreen: '홈 화면에 추가',
    installOnIOS: 'iPhone / iPad 에 설치하기',
    iosStep1: '1. Safari 브라우저 하단의 [공유] 버튼을 누르세요.',
    iosStep2: '2. 아래로 스크롤하여 [홈 화면에 추가]를 선택하세요.',
    gotIt: '확인했습니다',
    interstitialAd: '전면 광고 (AdMob Interstitial)',
    closeInSeconds: '초 후 건너뛰기 가능',
    skipAd: '광고 건너뛰기',
    vipNoAds: '화면 메가폰 VIP 광고 제거 혜택',
    adDemoDesc: '【전체 화면 모드 종료 시 표시되는 전면 광고 시연】\n전체 화면이 20초 이상 지속되었을 때만 노출되며, 설정 조절 중에는 광고가 뜨지 않습니다.',
    closeAdReturn: '광고 닫고 편집기로 돌아가기',
    waitSeconds: '잠시만 기다려주세요',
    marketCardTitle: '‘화면 메가폰’을 Google Play에 출시하고 싶으신가요?',
    marketCardBadge: '출시 가능성 100%',
    marketCardDesc: '구글 공식 Bubblewrap 도구를 통해 Java 코딩 없이 Android AAB 번들로 패키징하여 Google Play Console에 즉시 배포할 수 있습니다!',
    marketCardBtn: '출시 및 수익화 가이드 보기 →',
  },
  'zh-CN': {
    appName: '屏幕大声公',
    appSubtitle: '超亮 LED 手持弹幕 & 演唱会应援跑马灯',
    openFullscreen: '开启全屏',
    previewTitle: '实时双向预览 (点击画面可暂停 / 播放)',
    shareBanner: '分享',
    copied: '已复制',
    reset: '重置',
    defaultText: 'HELLO WORLD 🌟 屏幕大声公',
    tabEditor: '弹幕调校',
    tabTemplates: '热门应援范本',
    tabSaved: '已收藏弹幕',
    tabMonetization: '上架分析',
    inputPlaceholder: '请输入要滚动播放的弹幕文字...',
    quickTags: {
      encore: '★ ENCORE! 安可!! ★',
      cheer: '🔥 应援打 CALL！',
      love: '💖 我爱你 永远支持',
      welcome: '✈️ 欢迎抵达',
      taxi: '🚕 TAXI 请搭乘',
      sos: '🚨 请让路 谢谢！',
    },
    fontSize: '文字字号',
    scrollSpeed: '滚动速度',
    glowIntensity: '霓虹发光强度',
    dotSize: 'LED 点阵颗粒大小',
    dotGap: '点阵间距',
    direction: '滚动方向与动态',
    dirLeft: '向左滚动',
    dirRight: '向右滚动',
    dirStatic: '静止固定',
    dirBlink: '闪烁交替',
    dirBounce: '左右往返',
    displayStyle: '渲染风格模式',
    styleLedMatrix: '拟真点阵 (LED)',
    styleNeonGlow: '霓虹夜光 (Neon)',
    styleOutline: '双色立体描边 (3D Outline)',
    stylePixelArt: '双色立体描边 (3D Outline)',
    styleClean: '纯净平滑 (Clean)',
    colorPreset: '色彩主题预设',
    colorAmber: '暖琥珀金',
    colorRainbow: '动态彩虹',
    colorCyan: '科技电光青',
    colorPink: '热情桃粉',
    colorLime: '荧光电能绿',
    colorPolice: '警铃红白蓝',
    colorWhite: '冷光极致白',
    colorCustom: '自定义色彩',
    fontFamily: '显示字体',
    fontHeavyBold: '应援特黑体 (Heavy)',
    fontCalligraphy: '霸气国潮书 (Brush)',
    fontCutePop: '甜萌元气圆 (Cute)',
    fontCyberTech: '赛博极速 (Cyber)',
    mirrorText: '镜像反转 (自拍镜头或车窗专用)',
    blinkText: '闪烁特效',
    borderFrame: '点阵外边框',
    saveCurrent: '收藏当前弹幕',
    savedSuccess: '已收藏至列表！',
    screenAlwaysOn: '屏幕常亮已开启',
    holdingSign: '手持应援中',
    confettiCheer: '发送彩色纸花应援',
    toggleLandscape: '切换强制横屏 (免翻转)',
    exitFullscreen: '退出全屏',
    paused: '已暂停',
    playing: '播放中',
    strobeFlash: '闪烁暴闪 (现场打 Call 节奏)',
    rotateDevicePrompt: '手机横放将自动全屏满版播放',
    catConcert: '应援',
    catAirport: '接机',
    catParty: '派对',
    catDaily: '日常',
    catLove: '表白',
    applyTemplate: '套用此范本',
    catAll: '全部',
    fullCheerBanner: '满版应援',
    clear: '清空',
    charsCount: '字',
    bannerContent: '弹幕内容 (支持文字与 Emoji)',
    customColorHint: '点击色块自选任意色彩',
    rainbowActive: '🌈 动态彩虹中',
    fontStyles: 'LED 字体风格',
    crazyBlink: '狂欢暴闪',
    mirrorFlip: '镜像反转',
    neonBorder: '霓虹灯边框',
    toggleOn: '开启',
    toggleOff: '关闭',
    mirrorOn: '开启 (反字)',
    mirrorOff: '正常',
    switchLanguage: '切换语言',
    savedTitle: '常用弹幕收藏库',
    alreadySaved: '✓ 已在收藏库',
    saveCurrentBanner: '+ 收藏当前弹幕',
    emptySaved: '暂无收藏的弹幕，编辑完喜欢的内容后可点击上方按钮收藏！',
    noText: '(无文字)',
    loadAndUse: '载入并使用',
    delete: '删除',
    speedLabel: '速度',
    installApp: '安装 App 到桌面',
    addToHomeScreen: '添加到主屏幕',
    installOnIOS: '在 iPhone / iPad 上安装',
    iosStep1: '1. 点击 Safari 浏览器底部的「分享」按钮。',
    iosStep2: '2. 向下滚动并选择「添加到主屏幕」 (Add to Home Screen)。',
    gotIt: '我知道了',
    interstitialAd: '全屏插页广告 (AdMob Interstitial)',
    closeInSeconds: '秒后可关闭',
    skipAd: '跳过广告',
    vipNoAds: '《屏幕大声公》VIP 免广告权益',
    adDemoDesc: '【这是退出全屏手持模式时触发的插页广告示范】\n全屏手持持续超过 20 秒才触发，小于 20 秒不推广告，避免调整参数时打扰用户。',
    closeAdReturn: '关闭广告返回编辑器',
    waitSeconds: '请稍候',
    marketCardTitle: '想将《屏幕大声公》上架 Google Play？',
    marketCardBadge: '可行性 100%',
    marketCardDesc: '《屏幕大声公》已内置完整 PWA 规格，可通过 Google 官方 Bubblewrap 工具免写 Java 快速打包为 AAB 上传 Google Play Console，享有千万级 ASO 自然搜索流量与广告收益！',
    marketCardBtn: '查看上架与变现指南 →',
  },
};

export function detectBrowserLanguage(): SupportedLanguage {
  try {
    const navLang = (navigator.language || navigator.languages?.[0] || 'zh-TW').toLowerCase();
    if (navLang.startsWith('ja')) return 'ja';
    if (navLang.startsWith('ko')) return 'ko';
    if (navLang.includes('cn') || navLang.includes('hans') || navLang.includes('sg')) return 'zh-CN';
    if (navLang.startsWith('zh')) return 'zh-TW';
    if (navLang.startsWith('en')) return 'en';
    // Default to English for other international users (e.g., es, fr, de, id, vi, th)
    return 'en';
  } catch {
    return 'zh-TW';
  }
}
