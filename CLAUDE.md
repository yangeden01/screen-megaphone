# CLAUDE.md — 螢幕大聲公（Screen Megaphone）

依 GitHub `yangeden01/screen-megaphone` 的程式碼與提交紀錄整理，日期 2026-11-21。`main` 為 `c527870`（v1.0.2 / versionCode 3）。

未驗證：Play Console 正式版的實際版本號、上架國家、是否啟用 Play App Signing、GitHub Actions 最近一次結果；本機未實際建置。以下標「待確認」的項目，第一次有 Play Console 截圖或資訊時要更新本檔。

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
- AI Studio 專案保留當備份，不要刪除。`.aistudio/`、`assets/aistudio/`、`metadata.json`、`.env.example` 是 AI Studio 遺留的檔案。

## 架構

Bubblewrap 產生的 TWA 外殼，但實際改成 **WebView 載入 APK 內的離線網頁**，不依賴任何伺服器。

- 前端 `src/`：React 19、Vite 8、Tailwind 4、motion、canvas-confetti。主畫面 `App.tsx`，跑馬燈繪製 `components/MarqueeCanvas.tsx`，全螢幕 `FullscreenDisplay.tsx`。
- 多語系 `src/i18n/translations.ts`：en、ja、ko、zh-TW、zh-CN，依裝置語言自動切換，可手動切換。新增文字要五種語言都補。
- Android `app/`：Java。`LauncherActivity.java` 以 `WebViewAssetLoader` 載入 `https://appassets.androidplatform.net/assets/web/index.html`，並處理橫向全螢幕（含瀏海）。
- `app/src/main/assets/web/` 是建置產物（`npm run build` 會把 `dist/` 複製進去），不要手改。
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
- 每次 build 都會把新雜湊檔名的 `index-*.js` 加進 `app/src/main/assets/web/assets/`，舊檔不會被清掉，APK 會越來越大（目前約 39 MB）。
- 本機需要 JDK 17 與 Android SDK 36。

CI：`.github/workflows/build-android-aab.yml`，`main` push 或手動 dispatch 觸發，建置 AAB 與 APK 放在 Artifacts（`screen-megaphone-google-play-aab`、`screen-megaphone-phone-apk`，保留 30 天）。**不會上傳 Play。**

## 簽署

- release 版由 repo 根目錄的 `release.keystore`（alias `android`）簽署，SHA-256：`F0:EE:FB:34…7D:B7:E3:3A`，與 `upload_certificate.pem` 相同，推定就是 Play 上傳金鑰（待確認）。
- CI 的「Generate Android Signing Keystore」步驟每次產生新的 `android.keystore`，但 `app/build.gradle` 優先找 `release.keystore`，所以實際**不會**用到新產生的那把。不要刪除 `release.keystore`，否則 CI 會改用隨機金鑰，Play 會拒收。
- 不得更換應用程式簽署金鑰。上傳金鑰若要更換，只能在 Play Console 申請重設上傳金鑰，並同步更新 CI。

## 版本

- versionCode / versionName 寫在 `app/build.gradle` 與 `twa-manifest.json` 兩處，要一起改；CI 不會自動遞增。
- 目前 3 / 1.0.2。Play 已使用的最大 versionCode 待確認，下一版至少 4。

## 現況與風險（依優先順序，只回報，待使用者決定）

1. **簽署金鑰與密碼公開。** repo 是公開的，`release.keystore` 與寫死在 `app/build.gradle` 的密碼都在裡面；CI 還把 `android.keystore` 一起上傳到 Artifacts。若有 Play App Signing，外人仍需要你的 Play 帳號才能上傳，風險有限，但建議之後：申請重設上傳金鑰 → 改存 GitHub Secrets → 從 repo 移除。
2. **模擬廣告。** `AdBanner.tsx` 與 `AdInterstitialModal.tsx`（離開全螢幕時跳出）顯示「AdMob 廣告位」字樣的假廣告，不是真的 AdMob。正式版出現假廣告可能違反 Play 政策，也影響體驗；要接真廣告或移除，需使用者決定。
3. **APK 內含個人截圖。** `app/src/main/assets/web/assets/aistudio/`（49 張）與 `public/assets/aistudio/` 是 AI Studio 對話時上傳的 Play Console、GitHub 截圖，會被打包進 APK 與公開 repo。
4. **`PublishGuideModal.tsx`** 是給開發者看的上架教學，仍在 App 內；要不要對使用者隱藏待確認。
5. 舊建置產物累積造成 APK 肥大（見「建置」）。

## 上架流程

1. 通過 `npm run lint`、`npm run build`。
2. 同步遞增 `app/build.gradle` 與 `twa-manifest.json` 的 versionCode、versionName。
3. 推送到 `main`（經使用者同意），等 CI 成功。
4. 確認簽署用的是 `release.keystore`（SHA-256 `F0:EE:FB:34…`）。
5. 從 Artifacts 下載 `screen-megaphone-google-play-aab`，先上傳內部測試軌。
6. 實機驗證：開啟不黑屏、橫向全螢幕、跑馬燈、五種語言、舊版升級。
7. 升級到正式版，分階段發布。
8. 使用者可見或資料相關變更要同步更新 `privacy.html`、`privacy-policy.html`（根目錄與 `public/` 各一份）與資料安全表單。
