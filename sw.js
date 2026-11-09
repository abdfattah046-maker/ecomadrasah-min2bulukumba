const CACHE_NAME = 'ecomadrasah-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Instal Service Worker & Simpan Cache Utama
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Menangani Fetch (Tarik Data)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan dari cache jika ada, jika tidak tarik dari internet
        return response || fetch(event.request).catch(() => {
          console.log('Koneksi terputus saat mencoba mengambil:', event.request.url);
        });
      })
  );
});

// Membersihkan Cache Lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
