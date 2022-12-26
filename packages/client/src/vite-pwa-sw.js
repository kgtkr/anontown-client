self.addEventListener("push", (evt) => {
  const data = evt.data.json();
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
  evt.waitUntil(clients.openWindow(evt.notification.data.url));
});
