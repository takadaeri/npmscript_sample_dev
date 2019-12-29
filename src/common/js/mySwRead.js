if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    console.log('loaded');
    navigator.serviceWorker.register('/service-worker.js?191228').then(
      registration => {
        console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
      },
      error => {
        console.log(`ServiceWorker registration failed: ${error}`);
      });
    // navigator.serviceWorker.register('/push/firebase-messaging-sw.js', {scope:'/push/'}).then(
    //   registration => {
    //     console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
    //   },
    //   error => {
    //     console.log(`ServiceWorker registration failed: ${error}`);
    //   });
  });
}