import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Android App（LauncherActivity 會注入 ScreenMegaphoneAndroid）的網頁本來就從 APK 載入，
// 不需要 Service Worker；順便移除舊版本留下的 Service Worker 與快取，避免顯示舊畫面。
const isAndroidApp = 'ScreenMegaphoneAndroid' in window;
if (isAndroidApp) {
  navigator.serviceWorker?.getRegistrations?.()
    .then((regs) => regs.forEach((r) => r.unregister()))
    .catch(() => {});
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
  }
} else {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(<App />);
