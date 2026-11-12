// QG do Caju: service worker mínimo, só para o app poder ser instalado. Não guarda nada em cache.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () {});
