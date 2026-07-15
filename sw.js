const CACHE='puroclean-v3';
const URLS=['/','/puroclean-kalispell.html','/puroclean-lethbridge.html','/manifest.json','/icon-192.png','/icon-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(URLS);}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(res){var clone=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,clone);});return res;}).catch(function(){return caches.match('/');});}));});
