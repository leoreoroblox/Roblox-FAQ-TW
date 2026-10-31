// 這是一個最基礎的 Service Worker，用來讓 PWA 生效
const CACHE_NAME = 'leo-studio-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png'
];

// 安裝時，把基本檔案存進快取
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 當網路發出請求時，優先從網路抓，如果失敗才用快取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
