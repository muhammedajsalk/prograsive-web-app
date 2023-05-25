self.addEventListener("install",function(event){
    console.log("installed",event);
    event.waitUntil(
        caches.open("static").then((cache)=>{
            cache.add("/js/jquery-3.5.1.min.js")
            cache.add("/js/script.js")
        })
    );
   
});

self.addEventListener("activate",function(event){
    console.log("Activated",event);
    return self.clients.claim();
});

self.addEventListener("fetch",function(event){
    console.log("Service worker fetch",event);
    event.respondWith(fetch(event.request));
});