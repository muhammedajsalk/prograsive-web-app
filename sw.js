self.addEventListener("install",function(event){
    console.log("installed",event);
    event.waitUntil(
        caches.open("static").then((cache)=>{
            cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/js/script.js",
                "/js/jquery-3.5.1.min.js",
                "/css/style.css",
                "/images/logo.svg",
                "/images/search.svg",
                "/fonts/product_sans_bold-webfont.woff2",
                "/fonts/product_sans_bold-webfont.woff",
                "/fonts/product_sans_regular-webfont.woff2",
                "/fonts/product_sans_regular-webfont.woff",
                "https://traveller.talrop.works/api/v1/places/categories/",
                "https://traveller.talrop.works/api/v1/places/"
            ])
        })
    );
   
});

self.addEventListener("activate",function(event){
    console.log("Activated",event);
    return self.clients.claim();
});

self.addEventListener("fetch",function(event){
    event.respondWith(
        caches.match(event.request).then((response)=>{
          if(response){
            return response;
          }else{
            return fetch(event.request).then((res)=>{
                return caches.open("dynamic").then((cache)=>{
                    cache.put(event.request.url,res.clone());
                    return res;
                })
            });
          }
        })
    );
});