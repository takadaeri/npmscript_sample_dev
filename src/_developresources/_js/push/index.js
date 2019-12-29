if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    console.log('push FCM SW loaded');
    navigator.serviceWorker.register('/push/firebase-messaging-sw.js', {scope:'/push/'}).then(
      registration => {
        console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
      },
      error => {
        console.log(`ServiceWorker registration failed: ${error}`);
      });
  });
}