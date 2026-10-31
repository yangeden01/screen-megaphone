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
  stylePixelArt: string;
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
  // Language Switcher
  switchLanguage: string;
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
    stylePixelArt: '像素點陣 (Pixel)',
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
    switchLanguage: '切換語言',
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
    stylePixelArt: 'Pixel Art',
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
    switchLanguage: 'Language',
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
    stylePixelArt: 'ドット絵 (Pixel)',
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
    switchLanguage: '言語切替',
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
    stylePixelArt: '픽셀 아트',
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
    switchLanguage: '언어 변경',
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
    stylePixelArt: '像素点阵 (Pixel)',
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
    switchLanguage: '切换语言',
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
