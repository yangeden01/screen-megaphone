// 把 App 用到的字體（@fontsource 套件）複製到 public/fonts/，並產生 public/fonts/fonts.css，
// 讓字體打包進 APK、離線也能顯示。由 `npm run build` / `npm run dev` 自動執行；public/fonts/ 不進 git。
// 只複製 woff2（Android WebView 皆支援），不帶 woff 備援檔，避免安裝檔多一倍。
// 不交給 Vite 打包：約 900 個 @font-face 會讓打包器（rolldown）堆疊溢位。
//
// 中日韓字體只保留常用字（見 CHARSETS），字體從 17.7 MB 縮到約 12 MB。不在常用字表的字仍會顯示，
// 只是改用下一個備援字體（Noto Sans TC 或系統字體），不會變成空白方塊。
//
// 新增或更換字體：npm i @fontsource/<名稱>，加進下面的 FONTS，並同步 src/utils/fontHelper.ts。
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import subsetFont from 'subset-font';

const FONTS = [
  // [套件名稱, 字重, 字集] — 對應 src/utils/fontHelper.ts 的 fontFamily / weight
  // 字集：zh、ja、ko 見 CHARSETS；null 表示整套保留（拉丁字體本來就很小）。
  // Noto Sans TC 也是所有語言的備援字體（含簡中的「特黑體」），所以用 zh（含簡體字）。
  ['noto-sans-tc', 900, 'zh'],
  ['ma-shan-zheng', 400, 'zh'],
  ['zcool-kuaile', 400, 'zh'],
  ['orbitron', 900, null],
  ['permanent-marker', 400, null],
  ['fredoka', 700, null],
  ['dela-gothic-one', 400, 'ja'],
  ['yuji-boku', 400, 'ja'],
  ['m-plus-rounded-1c', 800, 'ja'],
  ['black-han-sans', 400, 'ko'],
  ['nanum-brush-script', 400, 'ko'],
  ['gaegu', 700, 'ko'],
];

const OUT = 'public/fonts';

// ---- 常用字表：由各地傳統編碼的字集解出來（WHATWG 編碼表是固定標準，每次建置結果相同） ----
function decodeRows(encoding, leadFrom, leadTo, trails) {
  const decoder = new TextDecoder(encoding);
  const set = new Set();
  for (let lead = leadFrom; lead <= leadTo; lead++) {
    for (const [from, to] of trails) {
      for (let trail = from; trail <= to; trail++) {
        for (const ch of decoder.decode(new Uint8Array([lead, trail]))) {
          const cp = ch.codePointAt(0);
          // 排除 ASCII、替代字元與私用區（自造字）
          if (cp > 0x7f && cp !== 0xfffd && !(cp >= 0xe000 && cp <= 0xf8ff)) set.add(cp);
        }
      }
    }
  }
  return set;
}

const BIG5_TRAILS = [[0x40, 0x7e], [0xa1, 0xfe]];
const EUC_TRAILS = [[0xa1, 0xfe]];
const union = (...sets) => new Set(sets.flatMap((s) => [...s]));

const CHARSETS = {
  // 繁體：Big5 符號＋常用字（A140–C67E，約 5,400 字，涵蓋教育部常用國字）
  // 簡體：GB2312（約 6,700 字）
  zh: () =>
    union(decodeRows('big5', 0xa1, 0xc6, BIG5_TRAILS), decodeRows('gbk', 0xa1, 0xf7, EUC_TRAILS)),
  // 日文：JIS X 0208 第 1–47 區（符號、假名、第一水準漢字約 3,000 字）。
  // 第二水準（約 3,400 字）佔日文字體一半大小但很少用，不收；少數常用漢字、人名用漢字在第二水準，會改用備援字體。
  ja: () => decodeRows('euc-jp', 0xa1, 0xcf, EUC_TRAILS),
  // 韓文：KS X 1001 符號與 2,350 個常用韓文音節，不含漢字
  ko: () => decodeRows('euc-kr', 0xa1, 0xc8, EUC_TRAILS),
};

// 每種字集都保留：非中日韓的字元（拉丁、符號等）、中日韓標點、假名、韓文相容字母、全形字元，
// 以及 App 介面與範本裡出現的所有字（src/ 內的文字），確保預設畫面一定是原字體。
function alwaysKeep(cp) {
  return (
    cp < 0x2e80 ||
    (cp >= 0x3000 && cp <= 0x30ff) ||
    (cp >= 0x3130 && cp <= 0x318f) ||
    (cp >= 0xff00 && cp <= 0xffef)
  );
}

function sourceChars(dir = 'src') {
  const set = new Set();
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      for (const cp of sourceChars(path)) set.add(cp);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      for (const ch of readFileSync(path, 'utf8')) set.add(ch.codePointAt(0));
    }
  }
  return set;
}

function parseRange(range) {
  const cps = [];
  for (const part of range.split(',')) {
    const [a, b] = part.trim().replace(/^U\+/i, '').split('-');
    const from = parseInt(a, 16);
    const to = b === undefined ? from : parseInt(b, 16);
    for (let cp = from; cp <= to; cp++) cps.push(cp);
  }
  return cps;
}

function formatRange(cps) {
  const hex = (n) => n.toString(16).toUpperCase();
  const parts = [];
  for (let i = 0; i < cps.length; ) {
    let j = i;
    while (j + 1 < cps.length && cps[j + 1] === cps[j] + 1) j++;
    parts.push(i === j ? `U+${hex(cps[i])}` : `U+${hex(cps[i])}-${hex(cps[j])}`);
    i = j + 1;
  }
  return parts.join(', ');
}

// ---- 快取：字體套件、字表來源與本腳本都沒變就不重做（npm run dev 不用每次等） ----
const stampInput = [
  readFileSync(new URL(import.meta.url)),
  ...FONTS.map(([pkg]) => readFileSync(`node_modules/@fontsource/${pkg}/package.json`)),
  ...[...sourceChars()].sort((a, b) => a - b).map(String),
].join('\n');
const stamp = createHash('sha256').update(stampInput).digest('hex');
if (existsSync(`${OUT}/.stamp`) && readFileSync(`${OUT}/.stamp`, 'utf8') === stamp) {
  console.log('public/fonts: up to date');
  process.exit(0);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const extra = sourceChars();
const charsetCache = {};
let css =
  '/* 由 scripts/gen-fonts.mjs 產生，請勿手改。字體授權：SIL Open Font License（見各 @fontsource 套件） */\n';
let files = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const [pkg, weight, charset] of FONTS) {
  const src = `node_modules/@fontsource/${pkg}`;
  const keep = charset ? (charsetCache[charset] ??= union(CHARSETS[charset](), extra)) : null;
  mkdirSync(`${OUT}/${pkg}`, { recursive: true });

  const blocks = readFileSync(`${src}/${weight}.css`, 'utf8').match(/@font-face\s*{[^}]*}/g) ?? [];
  const results = await Promise.all(
    blocks.map(async (block) => {
      const name = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)[1];
      const data = readFileSync(`${src}/files/${name}`);
      bytesIn += data.length;
      let out = data;
      let face = block.replace(/,\s*url\([^)]*\.woff\)\s*format\('woff'\)/g, '');

      const rangeMatch = face.match(/unicode-range:\s*([^;]+);/);
      if (keep && rangeMatch) {
        const all = parseRange(rangeMatch[1]);
        const kept = all.filter((cp) => alwaysKeep(cp) || keep.has(cp));
        if (kept.length === 0) return ''; // 整塊都是罕用字，不打包
        if (kept.length < all.length) {
          out = await subsetFont(data, String.fromCodePoint(...kept), { targetFormat: 'woff2' });
          face = face.replace(rangeMatch[0], `unicode-range: ${formatRange(kept)};`);
        }
      }

      writeFileSync(`${OUT}/${pkg}/${name}`, out);
      bytesOut += out.length;
      files++;
      return face.replace(/url\(\.\/files\/([^)]+\.woff2)\)/, `url(./${pkg}/$1)`);
    })
  );
  css += results.filter(Boolean).join('\n') + '\n';
}

writeFileSync(`${OUT}/fonts.css`, css);
writeFileSync(`${OUT}/.stamp`, stamp);
const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(
  `public/fonts: ${FONTS.length} fonts, ${files} woff2 files, ${mb(bytesIn)} MB -> ${mb(bytesOut)} MB`
);
