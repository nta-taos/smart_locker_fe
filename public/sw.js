/* Service Worker for handling Push Notifications */
console.log('[SW] Service Worker script loaded');

self.addEventListener('push', function (event) {
  console.log('[SW:push] Push event received:', event);
  let payload = {};
  try {
    if (event.data) {
      payload = event.data.json();
      console.log('[SW:push] Parsed payload:', payload);
    }
  } catch (e) {
    console.warn('[SW:push] Failed to parse JSON, using text:', e);
    payload = { title: 'New notification', body: event.data?.text() };
  }

  const title = payload.title || 'New notification';
  const options = {
    body: payload.body || payload.message || '',
    icon: payload.icon || '/favicon.ico',
    data: payload.data || {},
    badge: payload.badge || '/favicon.ico',
  };

  console.log('[SW:push] Showing notification:', { title, options });
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[SW:notificationclick] Notification clicked:', event.notification.tag);
  event.notification.close();
  const clickAction = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url === clickAction && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(clickAction);
    }),
  );
});

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('[SW:pushsubscriptionchange] Push subscription changed:', event);
});

// Respond to messages from clients
self.addEventListener('message', function (event) {
  console.log('[SW:message] Received message:', event.data);
});

console.log('[SW] Event listeners registered');
