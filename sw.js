// QG do Caju: service worker. Deixa o app ser instalado e mostra as notificações. Não guarda nada em cache.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () {});

// Notificação que chega com o app fechado (o texto nunca traz valores; os detalhes ficam dentro do app).
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) {}
  var m = d.data || d.notification || {};
  var titulo = m.titulo || m.title || 'QG do Caju';
  e.waitUntil(self.registration.showNotification(titulo, {
    body: m.texto || m.body || 'Tem novidade no QG.', icon: 'icone-192.png', badge: 'icone-192.png', tag: 'qg-do-caju', renotify: true
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (abas) {
    for (var i = 0; i < abas.length; i++) { if ('focus' in abas[i]) return abas[i].focus(); }
    return self.clients.openWindow(self.registration.scope);
  }));
});
