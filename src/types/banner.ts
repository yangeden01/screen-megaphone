export type ScrollDirection = 'left' | 'right' | 'static' | 'blink' | 'bounce';

export type FontStyle = 'Orbitron' | 'DotGothic16' | 'Noto Sans TC' | 'VT323';

export type RenderMode = 'led-matrix' | 'neon-glow' | 'pixel-art' | 'clean';

export type ColorPresetId = 
  | 'amber-gold'
  | 'rainbow'
  | 'cyber-cyan'
  | 'hot-pink'
  | 'electric-lime'
  | 'police-strobe'
  | 'pure-white'
  | 'custom';

export interface BannerConfig {
  id: string;
  text: string;
  fontSize: number; // 24 to 120
  speed: number; // 1 to 10
  direction: ScrollDirection;
  renderMode: RenderMode;
  fontFamily: FontStyle;
  textColor: string;
  colorPreset: ColorPresetId;
  backgroundColor: string;
  glowIntensity: number; // 0 to 10
  isBlinking: boolean;
  blinkSpeed: number; // 1 to 5
  isMirrored: boolean;
  hasBorder: boolean;
  borderColor: string;
  dotSize: number; // 4 to 12
  dotGap: number; // 1 to 6
}

export interface PresetTemplate {
  id: string;
  category: '應援' | '接機' | '派對' | '日常' | '表白';
  label: string;
  text: string;
  config: Partial<BannerConfig>;
}
