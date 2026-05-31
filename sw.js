self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }

  const title = data.title || "New grocery item";
  const options = {
    body: data.body || "A new item was added.",
    icon: "/assets/favicon-96x96.png",
    badge: "/assets/favicon-96x96.png",
    data: data.url || "/"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data || "/";
  event.waitUntil(clients.openWindow(targetUrl));
});