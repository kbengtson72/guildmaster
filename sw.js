const C="gm-v2";
self.addEventListener("install",e=>{self.skipWaiting();});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Always ask the server for the newest copy (skip the phone's HTTP cache); fall back to the saved copy only when offline.
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{ if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));} return r;})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match("./")||caches.match("index.html"))));});
