import { useState, useEffect, useCallback, useRef } from 'react';

// Android App 內由原生層提供（LauncherActivity 的 ScreenMegaphoneAndroid），
// 因為 Android WebView 不支援網頁的 Screen Wake Lock API。
type AndroidScreenBridge = { setKeepScreenOn: (on: boolean) => void };
function getAndroidBridge(): AndroidScreenBridge | null {
  const w = window as unknown as { ScreenMegaphoneAndroid?: AndroidScreenBridge };
  return w.ScreenMegaphoneAndroid && typeof w.ScreenMegaphoneAndroid.setKeepScreenOn === 'function'
    ? w.ScreenMegaphoneAndroid
    : null;
}

export function useWakeLock() {
  const [isSupported, setIsSupported] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    setIsSupported(!!getAndroidBridge() || 'wakeLock' in navigator);
  }, []);

  const requestLock = useCallback(async () => {
    const bridge = getAndroidBridge();
    if (bridge) {
      try {
        bridge.setKeepScreenOn(true);
        setIsLocked(true);
        return true;
      } catch {
        return false;
      }
    }
    if (!('wakeLock' in navigator)) return false;
    try {
      const sentinel = await navigator.wakeLock.request('screen');
      wakeLockRef.current = sentinel;
      setIsLocked(true);

      sentinel.addEventListener('release', () => {
        setIsLocked(false);
        wakeLockRef.current = null;
      });
      return true;
    } catch {
      setIsLocked(false);
      return false;
    }
  }, []);

  const releaseLock = useCallback(async () => {
    const bridge = getAndroidBridge();
    if (bridge) {
      try {
        bridge.setKeepScreenOn(false);
      } catch {
        // ignore
      }
      setIsLocked(false);
      return;
    }
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
      } catch {
        // ignore
      }
      wakeLockRef.current = null;
      setIsLocked(false);
    }
  }, []);

  // 回到前景時重新取得常亮（網頁 Wake Lock 在切到背景時會被系統釋放）。
  // 注意：卸載時才釋放，不能放在依賴 isLocked 的 effect cleanup 裡，
  // 否則一取得常亮、isLocked 變成 true 就會立刻被釋放。
  const isLockedRef = useRef(false);
  isLockedRef.current = isLocked;

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isLockedRef.current && !getAndroidBridge()) {
        requestLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [requestLock]);

  useEffect(() => {
    return () => {
      releaseLock();
    };
  }, [releaseLock]);

  return { isSupported, isLocked, requestLock, releaseLock };
}
