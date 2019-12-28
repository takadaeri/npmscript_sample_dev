
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


// ---------------------------------------------------------------
// serviceWorker
// ---------------------------------------------------------------

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(
    registration => {
      console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
      registration.onupdatefound = function() {
        console.log('アップデートがあるのでアップデート');
        registration.update();
      };
    },
    error => {
      console.log(`ServiceWorker registration failed: ${error}`);
    }
  );
}