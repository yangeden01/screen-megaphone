import { SupportedLanguage } from '../i18n/translations';

export interface FontDefinition {
  id: string;
  category: 'heavy-bold' | 'calligraphy' | 'cute-pop' | 'cyber-tech';
  nameZhTW: string;
  nameZhCN: string;
  nameEn: string;
  nameJa: string;
  nameKo: string;
  sampleZhTW: string;
  sampleZhCN: string;
  sampleEn: string;
  sampleJa: string;
  sampleKo: string;
  fontFamily: string;
  weight: string;
  fontStyle?: string;
}

// 4 Universal Archetypes mapped cleanly per language
export function getFontDefinitionsForLang(lang: SupportedLanguage): {
  id: string;
  category: 'heavy-bold' | 'calligraphy' | 'cute-pop' | 'cyber-tech';
  label: string;
  sample: string;
  fontFamily: string;
  weight: string;
  fontStyle?: string;
}[] {
  switch (lang) {
    case 'en':
      return [
        {
          id: 'heavy-bold',
          category: 'heavy-bold',
          label: 'Impact Heavy',
          sample: 'LOUD 900',
          fontFamily: "'Impact', 'Plus Jakarta Sans', sans-serif",
          weight: '900',
        },
        {
          id: 'calligraphy',
          category: 'calligraphy',
          label: 'Brush Calligraphy',
          sample: 'BRUSH ART',
          fontFamily: "'Permanent Marker', cursive",
          weight: 'normal',
        },
        {
          id: 'cute-pop',
          category: 'cute-pop',
          label: 'Cute Pop',
          sample: 'CUTE POP ✨',
          fontFamily: "'Fredoka', sans-serif",
          weight: '700',
        },
        {
          id: 'cyber-tech',
          category: 'cyber-tech',
          label: 'Cyber Tech',
          sample: 'CYBER 2077',
          fontFamily: "'Orbitron', sans-serif",
          weight: '900',
          fontStyle: 'italic',
        },
      ];

    case 'ja':
      return [
        {
          id: 'heavy-bold',
          category: 'heavy-bold',
          label: '応援極太ゴシック',
          sample: '最強応援 900',
          fontFamily: "'Dela Gothic One', 'Noto Sans JP', sans-serif",
          weight: '900',
        },
        {
          id: 'calligraphy',
          category: 'calligraphy',
          label: '筆文字・書道体',
          sample: '筆文字 墨魂',
          fontFamily: "'Yuji Boku', serif",
          weight: 'normal',
        },
        {
          id: 'cute-pop',
          category: 'cute-pop',
          label: 'ポップ丸文字',
          sample: 'カワイイ 丸文字',
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          weight: '800',
        },
        {
          id: 'cyber-tech',
          category: 'cyber-tech',
          label: 'サイバーテック',
          sample: 'サイバー TECH',
          fontFamily: "'Orbitron', sans-serif",
          weight: '900',
          fontStyle: 'italic',
        },
      ];

    case 'ko':
      return [
        {
          id: 'heavy-bold',
          category: 'heavy-bold',
          label: '임팩트 볼드',
          sample: '임팩트 900',
          fontFamily: "'Black Han Sans', sans-serif",
          weight: '900',
        },
        {
          id: 'calligraphy',
          category: 'calligraphy',
          label: '붓글씨 캘리',
          sample: '붓글씨 캘리',
          fontFamily: "'Nanum Brush Script', cursive",
          weight: 'normal',
        },
        {
          id: 'cute-pop',
          category: 'cute-pop',
          label: '큐트 팝체',
          sample: '귀여운 팝체',
          fontFamily: "'Gaegu', cursive",
          weight: '700',
        },
        {
          id: 'cyber-tech',
          category: 'cyber-tech',
          label: '사이버 테크',
          sample: '사이버 테크',
          fontFamily: "'Orbitron', sans-serif",
          weight: '900',
          fontStyle: 'italic',
        },
      ];

    case 'zh-CN':
      return [
        {
          id: 'heavy-bold',
          category: 'heavy-bold',
          label: '应援特黑体 (Heavy)',
          sample: '强烈震撼 900',
          fontFamily: "'Noto Sans SC', 'Noto Sans TC', sans-serif",
          weight: '900',
        },
        {
          id: 'calligraphy',
          category: 'calligraphy',
          label: '霸气国潮书 (Brush)',
          sample: '气势书法 楷意',
          fontFamily: "'Ma Shan Zheng', cursive",
          weight: 'normal',
        },
        {
          id: 'cute-pop',
          category: 'cute-pop',
          label: '甜萌元气圆 (Cute)',
          sample: '甜蜜萌系 元气',
          fontFamily: "'ZCOOL KuaiLe', cursive",
          weight: 'normal',
        },
        {
          id: 'cyber-tech',
          category: 'cyber-tech',
          label: '赛博极速 (Cyber)',
          sample: '赛博极速 TECH',
          fontFamily: "'Orbitron', sans-serif",
          weight: '900',
          fontStyle: 'italic',
        },
      ];

    case 'zh-TW':
    default:
      return [
        {
          id: 'heavy-bold',
          category: 'heavy-bold',
          label: '應援特黑體 (Heavy)',
          sample: '強烈震撼 900',
          fontFamily: "'Noto Sans TC', sans-serif",
          weight: '900',
        },
        {
          id: 'calligraphy',
          category: 'calligraphy',
          label: '霸氣國潮書 (Brush)',
          sample: '氣勢書法 楷意',
          fontFamily: "'Ma Shan Zheng', cursive",
          weight: 'normal',
        },
        {
          id: 'cute-pop',
          category: 'cute-pop',
          label: '甜萌元氣圓 (Cute)',
          sample: '甜蜜萌系 元氣',
          fontFamily: "'ZCOOL KuaiLe', cursive",
          weight: 'normal',
        },
        {
          id: 'cyber-tech',
          category: 'cyber-tech',
          label: '賽博極速 (Cyber)',
          sample: '賽博極速 TECH',
          fontFamily: "'Orbitron', sans-serif",
          weight: '900',
          fontStyle: 'italic',
        },
      ];
  }
}

// Maps stored font ID or legacy name to the language-specific canvas font string
export function resolveCanvasFont(
  storedFont: string,
  lang: SupportedLanguage,
  fontSize: number
): { fontString: string; isItalic: boolean; weight: string; fontFamily: string } {
  // Map legacy names to category IDs
  let targetId = storedFont;
  if (storedFont === 'Noto Sans TC' || storedFont === 'DotGothic16') {
    targetId = 'heavy-bold';
  } else if (storedFont === 'Ma Shan Zheng' || storedFont === 'VT323') {
    targetId = 'calligraphy';
  } else if (storedFont === 'ZCOOL KuaiLe') {
    targetId = 'cute-pop';
  } else if (storedFont === 'Orbitron') {
    targetId = 'cyber-tech';
  }

  const options = getFontDefinitionsForLang(lang);
  const matched = options.find((opt) => opt.id === targetId) || options[0];

  const fontStyle = matched.fontStyle ? `${matched.fontStyle} ` : '';
  const weight = matched.weight || '900';
  const fontString = `${fontStyle}${weight} ${fontSize}px ${matched.fontFamily}, "Noto Sans TC", sans-serif`;

  return {
    fontString,
    isItalic: !!matched.fontStyle,
    weight,
    fontFamily: matched.fontFamily,
  };
}
