self.addEventListener('push', function (event) {
  let name = ((((event || {}).data || {}).json() || {}).data || {}).name || 'sampledev';
  event.waitUntil(
    self.registration.showNotification(`${name}から`, {
      'body': 'からの通知が届いています。',
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  focusWindow(event);
});

function focusWindow(event) {
  const myPage = self.location.origin;
  const urlToOpen = new URL(myPage, self.location.origin).href;
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
    .then((windowClients) => {
      let matchingClient = null;
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });
  event.waitUntil(promiseChain);
}

function openWindow(event) {
  const myPage = self.location.origin;
  const promiseChain = clients.openWindow(myPage);
  event.waitUntil(promiseChain);
}