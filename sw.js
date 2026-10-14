// The app moved to https://team-hyunbin.pages.dev/. This takes the old service worker's place at
// /HYUNBIN-BIO-APP/sw.js: it empties the old app's caches, unregisters itself and reloads every open window, so an
// installed old app shows the moved page on its next launch instead of the precached old app. No fetch handler.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim()
      await Promise.all((await caches.keys()).map((key) => caches.delete(key)))
      await self.registration.unregister()
      const windows = await self.clients.matchAll({ type: 'window' })
      await Promise.all(windows.map((client) => client.navigate(client.url)))
    })(),
  )
})
