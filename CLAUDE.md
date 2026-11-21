# CLAUDE.md — 螢幕大聲公（Screen Megaphone）

依 GitHub `yangeden01/screen-megaphone` 的程式碼與提交紀錄整理，日期 2026-11-21。`main` 為 `c527870`（v1.0.2 / versionCode 3）；2026-11-21 起由 Claude Code 維護。

Play 正式版：**10 (1.0.4)**，2026-11-21 21:36（台北）已發布、全面推出（先經內部測試軌實機驗證）。前一版約 2026-11-19 發布，安裝 10。

未驗證：上架國家、Play App Signing 設定；本機無 Android SDK，Android 建置只在 CI 驗證過。以下標「待確認」的項目，第一次有 Play Console 截圖或資訊時要更新本檔。

## 工作規則

1. **不得影響已上架的 App 與已安裝的使用者。** 套件名 `com.screenmegaphone.ledbanner` 與簽署金鑰不可更動；變更要能從舊版直接升級。
2. **使用者要求修改時才改程式、CI 或 repo。** 檢查發現問題時只回報，不主動修改。
3. 未經確認不得提交到 `main`、部署、刪除或覆蓋資料。修改先推到 `claude/*` 或 `ccr-*` 工作分支，再由使用者決定是否合併。
4. 不得顯示、提交或分享 API Key、密碼、Secret 與簽署金鑰（含其密碼）。
5. 使用繁體中文。修改前先檢查現況，修改後執行必要測試（至少 `npm run lint`、`npm run build`）。
6. 工作告一段落前要推送；雲端環境閒置後會被回收，未推送的修改會遺失。
7. AI Studio 時期留下的自動化（自動 push、自動產生金鑰）不再適用，一律以本檔為準。

## 來源與交接

- 本 App 原本在 Google AI Studio 製作，由 AI Studio 推送到 GitHub；提交到 `c527870` 為止都來自 AI Studio。
- 2026-11-21 起改由 Claude Code 維護，**GitHub 是唯一的正本**。AI Studio 不會讀回 GitHub 上的新修改，若再從 AI Studio 推送，會蓋掉之後的修改，所以不要再用 AI Studio 改這個 App。
- AI Studio 專案保留當備份，不要刪除。`metadata.json`、`.env.example` 是 AI Studio 遺留的檔案；AI Studio 對話截圖已於 v1.0.5 移除（git 歷史中仍在）。

## 架構

Bubblewrap 產生的 TWA 外殼，但實際改成 **WebView 載入 APK 內的離線網頁**，不依賴任何伺服器。

- 前端 `src/`：React 19、Vite 8、Tailwind 4、motion、canvas-confetti。主畫面 `App.tsx`，跑馬燈繪製 `components/MarqueeCanvas.tsx`，全螢幕 `FullscreenDisplay.tsx`。
- 多語系 `src/i18n/translations.ts`：en、ja、ko、zh-TW、zh-CN，依裝置語言自動切換，可手動切換。新增文字要五種語言都補。
- Android `app/`：Java。`LauncherActivity.java` 以 `WebViewAssetLoader` 載入 `https://appassets.androidplatform.net/assets/web/index.html`，並處理橫向全螢幕（含瀏海）。
- `app/src/main/assets/web/` 是建置產物，**不進 git**（列在 `.gitignore`）。`npm run build` 會先清空再把 `dist/` 複製進去，所以本機或 CI 跑 Gradle 前一定要先 `npm run build`。
- **字體離線打包**：`scripts/gen-fonts.mjs` 在 `npm run build`／`dev` 時把 `@fontsource/*` 的 woff2 複製到 `public/fonts/`（不進 git），`index.html` 載入 `fonts/fonts.css`。不從 Google Fonts 載入。不能改成在 CSS 裡 import 交給 Vite 打包：約 900 個 `@font-face` 會讓 rolldown 堆疊溢位。新增字體要同步改 `scripts/gen-fonts.mjs` 與 `src/utils/fontHelper.ts`。
- 繁中的書法（Ma Shan Zheng）、可愛（ZCOOL KuaiLe）是簡體字型，部分繁體字（例如「應」）沒有字形，會退回粗黑體。
- **螢幕常亮**：Android WebView 不支援網頁 Wake Lock API，所以 `LauncherActivity` 提供 JS 介面 `ScreenMegaphoneAndroid.setKeepScreenOn(bool)`，`src/hooks/useWakeLock.ts` 在 App 內優先使用它；只在全螢幕時開啟。App 切到背景時會暫停 WebView。
- `vite.config.ts` 用 `@vitejs/plugin-legacy`（Chrome ≥ 60、Android ≥ 7）與 `vite-plugin-pwa`；舊版 WebView 黑屏問題靠這兩者處理，不要移除。
- AGP 8.9.1、JDK 17、compileSdk/targetSdk 36、minSdk 24。
- `twa-manifest.json` 的 `host` 指向 AI Studio 預覽網址（`ais-pre-*.run.app`），只剩 Bubblewrap 設定用途；App 執行時不會連線過去。
- 沒有後端。`@google/genai`、`express` 是 AI Studio 範本殘留，目前程式未使用。

## 建置

```bash
npm install
```

```bash
npm run lint
```

```bash
npm run build
```

```bash
./gradlew bundleRelease assembleRelease
```

- `npm run build` 含 `mkdir -p`、`cp -r`，Windows 要用 Git Bash。
- 打包進 APK 的網頁約 23 MB，其中字體約 22 MB（五種語言，v1.0.6 起離線打包）；程式本身約 1.2 MB。
- 本機需要 JDK 17 與 Android SDK 36。

CI：`.github/workflows/build-android-aab.yml`，`main` push 或手動 dispatch 觸發，建置 AAB 與 APK 放在 Artifacts（`screen-megaphone-google-play-aab`、`screen-megaphone-phone-apk`，保留 30 天）。**不會上傳 Play。**

## 簽署

- 必須使用 Play App Signing（上傳 AAB 必備）；CI 簽的是**上傳金鑰**，不是應用程式簽署金鑰。
- 上傳金鑰只放在 GitHub Secrets：`SIGNING_KEYSTORE_BASE64`、`SIGNING_STORE_PASSWORD`、`SIGNING_KEY_ALIAS`、`SIGNING_KEY_PASSWORD`。workflow 解碼到 `$RUNNER_TEMP`，再透過 `SIGNING_KEYSTORE_PATH` 等環境變數交給 `app/build.gradle`。**沒有 Secrets 時 CI 直接失敗**，不會用其他金鑰簽署。
- 現行上傳金鑰：alias `upload`，SHA-256 `B9:14:83:D1…7F:47:C4:AE`（SHA1 `53:51:CE:E2…`），2026-11-21 產生，原檔由使用者自行保管。
- 舊上傳金鑰 `release.keystore`（SHA-256 `F0:EE:FB:34…`，SHA1 `07:6E:4A:05…`）曾連同密碼放在公開 repo，已於 2026-11-21 向 Play 申請重設並從 repo 刪除（git 歷史中仍在，但 Play 已不接受）。
- 重設生效時間：**2026-11-23 14:36:58 UTC（台北 22:37）**。在此之前新舊金鑰都無法上傳。
- 本機不簽署 release 版；要上傳一律用 CI 產出的 AAB。CI 的「Show Signing Certificate Fingerprint」步驟會印出 SHA-256，上傳前核對。
- 不得更換應用程式簽署金鑰。金鑰或密碼不得寫進 repo（`.gitignore` 已排除 `*.keystore`、`*.jks`）。

## 版本

- versionCode / versionName 寫在 `app/build.gradle` 與 `twa-manifest.json` 兩處，要一起改；CI 不會自動遞增。
- 程式碼目前 12 / 1.0.6（效能、離線字體、螢幕常亮）。11 / 1.0.5（清除截圖與舊建置檔）的 AAB 由 PR #5 合併後的 CI 產出，等上傳金鑰生效後上架；正式版為 10 / 1.0.4。Play 已用過 versionCode 4（2026-11-21 上傳內部測試時被拒），實際最大值不明，所以直接跳到 10。下次上傳若再被拒就繼續往上加，並把 Play 實際用到的數字記在這裡。
- 1.0.4 的內容與原本準備的 1.0.3 相同（移除模擬廣告與上架教學）。

## 現況與風險（依優先順序，只回報，待使用者決定）

1. ~~上傳金鑰外洩~~：2026-11-21 已重設上傳金鑰、CI 改用 Secrets、刪除 `release.keystore` 與寫死的密碼。新金鑰 2026-11-23 22:37（台北）後才能上傳。
2. ~~模擬廣告~~：v1.0.3 已移除。要接真的 AdMob 須在 Android 原生層加 SDK，另案處理。
3. ~~APK 內含個人截圖~~：v1.0.5 已移除（AI Studio 截圖、`.aistudio/`）。Play 商店圖片移到 repo 根目錄 `store-assets/`，不再打包進 APK。舊截圖仍留在 git 歷史，要徹底清除需改寫歷史，未處理。
4. ~~上架教學卡片~~：v1.0.3 已移除。`translations.ts` 內仍留有廣告、上架相關的未使用字串，可之後清理。
5. ~~舊建置產物累積~~：v1.0.5 已改成每次建置先清空，且不再提交建置產物。

## 上架流程

1. 通過 `npm run lint`、`npm run build`。
2. 同步遞增 `app/build.gradle` 與 `twa-manifest.json` 的 versionCode、versionName。
3. 推送到 `main`（經使用者同意），等 CI 成功。
4. 在 CI 的「Show Signing Certificate Fingerprint」步驟確認 SHA-256 與 Play Console 的上傳金鑰一致。
5. 從 Artifacts 下載 `screen-megaphone-google-play-aab`，先上傳內部測試軌。
6. 實機驗證：開啟不黑屏、橫向全螢幕、跑馬燈、五種語言、舊版升級。
7. 升級到正式版，分階段發布。
8. 使用者可見或資料相關變更要同步更新 `privacy.html`、`privacy-policy.html`（根目錄與 `public/` 各一份）與資料安全表單。
