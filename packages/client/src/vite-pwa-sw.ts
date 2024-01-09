/// <reference lib="webworker" />
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("push", (evt) => {
  const data = evt.data!.json();
  const title = data.title;
  const options = {
    body: data.body,
    data: {
      url: data.data.url,
    },
  };
  evt.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener("notificationclick", (evt) => {
  evt.notification.close();
  evt.waitUntil(self.clients.openWindow(evt.notification.data.url));
});

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));
