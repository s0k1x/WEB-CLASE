/* Unuvia · service worker
   - Avisos al móvil.
   - Sin conexión: guarda una copia de la web (red primero; si no hay internet, usa la copia).
     Así siempre ves la última versión cuando hay conexión. */
const CACHE = 'unuvia-v3';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/manifest.webmanifest', '/icon-192.png', '/badge-96.png']).catch(() => {})));
});
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('unuvia-') && k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const same = u.origin === self.location.origin, cdn = u.hostname === 'cdn.jsdelivr.net';
  if (!same && !cdn) return;                       // la base de datos y los archivos de Supabase nunca se guardan aquí
  e.respondWith((async () => {
    try {
      const res = await fetch(r);
      if (res && res.ok) { const c = await caches.open(CACHE); c.put(r, res.clone()).catch(() => {}); }
      return res;
    } catch (err) {
      const hit = await caches.match(r, { ignoreSearch: r.mode === 'navigate' });
      if (hit) return hit;
      if (r.mode === 'navigate') { const home = (await caches.match('/')) || (await caches.match('/index.html')); if (home) return home; }
      throw err;
    }
  })());
});

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  const title = d.title || 'Unuvia';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'badge-96.png',
    lang: 'es',
    timestamp: Date.now(),
    vibrate: [90, 50, 90],
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || '/' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) { await c.focus(); c.postMessage({ type: 'open', url }); return; }
    }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  })());
});
