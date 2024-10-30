

self.addEventListener('install', function (e) {
    self.skipWaiting(); // 새로운 서비스 워커가 즉시 활성화되도록 요청
    console.log('[Service Worker] Install');
    
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('[Service Worker] Old cache cleared:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim(); // 활성화 후 모든 페이지에 적용
});


