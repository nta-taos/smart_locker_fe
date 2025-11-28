import { useCallback } from 'react';

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function usePush() {
  const register = useCallback(async () => {
    console.log('[usePush.register] Starting registration...');
    if (!('serviceWorker' in navigator)) return { ok: false, reason: 'No service worker support' };
    if (!('PushManager' in window)) return { ok: false, reason: 'No PushManager support' };

    try {
      const permission = await Notification.requestPermission();
      console.log('[usePush.register] Notification permission:', permission);
      if (permission !== 'granted') return { ok: false, reason: 'Permission not granted' };

      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('[usePush.register] Service Worker registered');
      const existing = await registration.pushManager.getSubscription();
      console.log(
        '[usePush.register] Checking existing subscription:',
        existing ? 'exists' : 'none',
      );
      if (existing) {
        console.log('[usePush.register] Subscription already exists');
        return { ok: true, subscription: existing };
      }

      const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      console.log('[usePush.register] VITE_VAPID_PUBLIC_KEY:', vapidKey ? 'found' : 'missing');
      if (!vapidKey) return { ok: false, reason: 'VAPID key missing' };

      console.log('[usePush.register] Subscribing to push...');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(String(vapidKey)),
      });
      console.log('[usePush.register] Push subscription successful:', subscription.endpoint);

      try {
        const apiBase = (import.meta.env.VITE_API_BASE as string) || '';
        const url = apiBase
          ? `${apiBase.replace(/\/$/, '')}/api/push/subscribe`
          : '/api/push/subscribe';
        console.log('[usePush.register] POSTing subscription to:', url);

        // Get auth token from localStorage. The app stores a JSON auth object under `auth`.
        let token: string | null = null;
        const authRaw = localStorage.getItem('auth');
        if (authRaw) {
          try {
            const parsed = JSON.parse(authRaw) as { token?: string };
            token = parsed?.token || null;
          } catch {
            token = null;
          }
        }
        // Fallbacks for other possible storage keys
        token =
          token ||
          localStorage.getItem('token') ||
          localStorage.getItem('authToken') ||
          localStorage.getItem('access_token');
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          console.log('[usePush.register] Including Authorization header (token found)');
        } else {
          console.log('[usePush.register] No auth token found in localStorage');
        }

        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({ subscription }),
        });
        console.log('[usePush.register] POST response status:', res.status);
        if (!res.ok) {
          const text = await res.text();
          console.error('[usePush.register] POST error:', text);
        } else {
          console.log('[usePush.register] Subscription saved on server');
        }
      } catch (err) {
        console.error('[usePush.register] Failed to POST subscription:', err);
      }

      return { ok: true, subscription };
    } catch (err) {
      console.error('[usePush.register] Exception:', err);
      return { ok: false, reason: String(err) };
    }
  }, []);

  // Expose for manual testing from console
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__usePush = { register, urlBase64ToUint8Array };
    console.log('[usePush] Attached to window.__usePush for manual testing');
  }

  return { register };
}
