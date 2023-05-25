self.addEventListener("install",function(event){
    console.log("installed",event);
});

self.addEventListener("activate",function(event){
    console.log("Activated",event);
    return self.clients.claim();
});