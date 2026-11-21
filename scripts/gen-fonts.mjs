// 把 App 用到的字體（@fontsource 套件）複製到 public/fonts/，並產生 public/fonts/fonts.css，
// 讓字體打包進 APK、離線也能顯示。由 `npm run build` / `npm run dev` 自動執行；public/fonts/ 不進 git。
// 只複製 woff2（Android WebView 皆支援），不帶 woff 備援檔，避免安裝檔多一倍。
// 不交給 Vite 打包：約 900 個 @font-face 會讓打包器（rolldown）堆疊溢位。
//
// 新增或更換字體：npm i @fontsource/<名稱>，加進下面的 FONTS，並同步 src/utils/fontHelper.ts。
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const FONTS = [
  // [套件名稱, 字重] — 對應 src/utils/fontHelper.ts 的 fontFamily / weight
  ['noto-sans-tc', 900],
  ['ma-shan-zheng', 400],
  ['zcool-kuaile', 400],
  ['orbitron', 900],
  ['permanent-marker', 400],
  ['fredoka', 700],
  ['dela-gothic-one', 400],
  ['yuji-boku', 400],
  ['m-plus-rounded-1c', 800],
  ['black-han-sans', 400],
  ['nanum-brush-script', 400],
  ['gaegu', 700],
];

const OUT = 'public/fonts';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let css =
  '/* 由 scripts/gen-fonts.mjs 產生，請勿手改。字體授權：SIL Open Font License（見各 @fontsource 套件） */\n';
let files = 0;

for (const [pkg, weight] of FONTS) {
  const src = `node_modules/@fontsource/${pkg}`;
  const block = readFileSync(`${src}/${weight}.css`, 'utf8').replace(
    /,\s*url\([^)]*\.woff\)\s*format\('woff'\)/g,
    ''
  );
  mkdirSync(`${OUT}/${pkg}`, { recursive: true });
  css += block.replace(/url\(\.\/files\/([^)]+\.woff2)\)/g, (_, name) => {
    copyFileSync(`${src}/files/${name}`, `${OUT}/${pkg}/${name}`);
    files++;
    return `url(./${pkg}/${name})`;
  });
  css += '\n';
}

writeFileSync(`${OUT}/fonts.css`, css);
console.log(`public/fonts: ${FONTS.length} fonts, ${files} woff2 files`);
