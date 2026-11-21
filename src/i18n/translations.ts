export type SupportedLanguage = 'zh-TW' | 'en' | 'ja' | 'ko' | 'zh-CN';

export interface Translations {
  appName: string;
  openFullscreen: string;
  previewTitle: string;
  shareBanner: string;
  copied: string;
  reset: string;
  // Tabs
  tabEditor: string;
  tabTemplates: string;
  tabSaved: string;
  // Editor inputs
  inputPlaceholder: string;
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
  // Fullscreen HUD
  screenAlwaysOn: string;
  holdingSign: string;
  confettiCheer: string;
  toggleLandscape: string;
  exitFullscreen: string;
  paused: string;
  playing: string;
  strobeFlash: string;
  // Categories
  catConcert: string;
  catAirport: string;
  catParty: string;
  catDaily: string;
  catLove: string;
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
  // Bottom Card
}

export const translations: Record<SupportedLanguage, Translations> = {
  'zh-TW': {
    appName: '螢幕大聲公',
    openFullscreen: '開啟全螢幕',
    previewTitle: '即時雙向預覽 (點擊畫面可暫停 / 播放)',
    shareBanner: '分享',
    copied: '已複製',
    reset: '重設',
    tabEditor: '彈幕調校',
    tabTemplates: '熱門應援範本',
    tabSaved: '已收藏彈幕',
    inputPlaceholder: '請輸入要滾動播放的彈幕文字...',
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
    screenAlwaysOn: '螢幕常亮已開啟',
    holdingSign: '手持應援中',
    confettiCheer: '發送彩色紙花應援',
    toggleLandscape: '切換強制橫向 (免翻轉)',
    exitFullscreen: '退出全螢幕',
    paused: '已暫停',
    playing: '播放中',
    strobeFlash: '閃爍暴閃 (現場打 Call 節奏)',
    catConcert: '應援',
    catAirport: '接機',
    catParty: '派對',
    catDaily: '日常',
    catLove: '表白',
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
  },
  'en': {
    appName: 'Screen Megaphone',
    openFullscreen: 'Full Screen',
    previewTitle: 'Live Preview (Tap to Pause / Play)',
    shareBanner: 'Share',
    copied: 'Copied',
    reset: 'Reset',
    tabEditor: 'Editor',
    tabTemplates: 'Templates',
    tabSaved: 'Favorites',
    inputPlaceholder: 'Enter scrolling banner message...',
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
    screenAlwaysOn: 'Screen Stay-Awake Active',
    holdingSign: 'Holding Sign Mode',
    confettiCheer: 'Confetti Cannon Cheer',
    toggleLandscape: 'Force Landscape',
    exitFullscreen: 'Exit Fullscreen',
    paused: 'Paused',
    playing: 'Playing',
    strobeFlash: 'Strobe Flash (Rhythm Beat)',
    catConcert: 'Concert',
    catAirport: 'Airport',
    catParty: 'Party',
    catDaily: 'Daily',
    catLove: 'Love',
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
  },
  'ja': {
    appName: '画面メガホン',
    openFullscreen: '全画面表示',
    previewTitle: 'リアルタイムプレビュー (タップで一時停止 / 再生)',
    shareBanner: '共有',
    copied: 'コピー完了',
    reset: 'リセット',
    tabEditor: 'バナー調整',
    tabTemplates: '人気テンプレート',
    tabSaved: '保存済み',
    inputPlaceholder: '流れるメッセージを入力してください...',
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
    screenAlwaysOn: '画面常時点灯オン',
    holdingSign: '応援サインモード中',
    confettiCheer: '紙吹雪エフェクト',
    toggleLandscape: '強制横向き切替',
    exitFullscreen: '全画面を終了',
    paused: '一時停止',
    playing: '再生中',
    strobeFlash: 'ストロボ発光 (ビート連動)',
    catConcert: 'ライブ応援',
    catAirport: 'お出迎え',
    catParty: 'パーティー',
    catDaily: '日常',
    catLove: 'メッセージ',
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
  },
  'ko': {
    appName: '화면 메가폰',
    openFullscreen: '전체 화면',
    previewTitle: '실시간 미리보기 (탭하여 일시정지 / 재생)',
    shareBanner: '공유',
    copied: '복사됨',
    reset: '초기화',
    tabEditor: '배너 편집',
    tabTemplates: '인기 템플릿',
    tabSaved: '보관함',
    inputPlaceholder: '흘러갈 메시지를 입력하세요...',
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
    screenAlwaysOn: '화면 항상 켜짐 활성화',
    holdingSign: '응원 모드 진행 중',
    confettiCheer: '꽃가루 응원 효과',
    toggleLandscape: '가로 화면 고정',
    exitFullscreen: '전체 화면 종료',
    paused: '일시정지됨',
    playing: '재생 중',
    strobeFlash: '스트로브 점멸 (비트 효과)',
    catConcert: '콘서트 응원',
    catAirport: '공항 픽업',
    catParty: '파티/클럽',
    catDaily: '일상',
    catLove: '고백/애정',
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
  },
  'zh-CN': {
    appName: '屏幕大声公',
    openFullscreen: '开启全屏',
    previewTitle: '实时双向预览 (点击画面可暂停 / 播放)',
    shareBanner: '分享',
    copied: '已复制',
    reset: '重置',
    tabEditor: '弹幕调校',
    tabTemplates: '热门应援范本',
    tabSaved: '已收藏弹幕',
    inputPlaceholder: '请输入要滚动播放的弹幕文字...',
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
    screenAlwaysOn: '屏幕常亮已开启',
    holdingSign: '手持应援中',
    confettiCheer: '发送彩色纸花应援',
    toggleLandscape: '切换强制横屏 (免翻转)',
    exitFullscreen: '退出全屏',
    paused: '已暂停',
    playing: '播放中',
    strobeFlash: '闪烁暴闪 (现场打 Call 节奏)',
    catConcert: '应援',
    catAirport: '接机',
    catParty: '派对',
    catDaily: '日常',
    catLove: '表白',
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
