
const body = document.body;
let supportTouch = 'ontouchstart' in document;
if ( supportTouch === false ) {
  body.classList.add('no-touchdv');
}

window.ontouchstart = function() {};
window.addEventListener('touchstart', function() {}, {passive: true});
window.addEventListener('touchstart', function() {}, {passive: false});


// ---------------------------------------------------------------
// modules
// ---------------------------------------------------------------

import navigateOffline from '@/modules/navigateOffline';
let navigator = document.querySelectorAll('.js-navigator');
navigator.forEach((item)=> {
  new navigateOffline(item);
});

import getDatabase from '@/modules/getDatabase';
new getDatabase(window.firebase);

import getBook from '@/modules/getBook';
getBook();

// import cloudMessaging from '@/modules/cloudMessaging';
// let fcm = document.querySelectorAll('.js-fcm');
// fcm.forEach(()=> {
//   new cloudMessaging(window.firebase);
// });


// ---------------------------------------------------------------
// serviceWorker
// ---------------------------------------------------------------

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    console.log('loaded');
    navigator.serviceWorker.register('/service-worker.js', {scope:'/'}).then(
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
