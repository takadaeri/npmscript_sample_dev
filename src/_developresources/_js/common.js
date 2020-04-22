// ---------------------------------------------------------------
// init
// ---------------------------------------------------------------

const body = document.body;
let supportTouch = 'ontouchstart' in document;
if ( supportTouch === false ) {
  body.classList.add('no-touchdv');
}

window.ontouchstart = function() {};
window.addEventListener('touchstart', function() {}, {passive: true});
window.addEventListener('touchstart', function() {}, {passive: false});

// ---------------------------------------------------------------
// serviceWorker
// ---------------------------------------------------------------

window.addEventListener('DOMContentLoaded', ()=> {
  console.log('sw --- DOMContentLoaded');
  console.log(navigator);
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {scope:'/'}).then(
        registration => {
          console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
        },
        error => {
          console.log(`ServiceWorker registration failed: ${error}`);
        });
  }  
});


// ---------------------------------------------------------------
// modules
// ---------------------------------------------------------------

import navigateOffline from '@/modules/navigateOffline';
let navoffline = document.querySelectorAll('.js-navoffline');
navoffline.forEach((item)=> {
  new navigateOffline(item);
});

import getDatabase from '@/modules/getDatabase';
new getDatabase(window.firebase);

import getBook from '@/modules/getBook';
getBook();

import cloudMessaging from '@/modules/cloudMessaging';
let fcm = document.querySelectorAll('.js-fcm');
fcm.forEach(()=> {
  new cloudMessaging(window.firebase);
});


// ---------------------------------------------------------------
// vues
// ---------------------------------------------------------------

import vueApp from '@/vues/vueApp';
vueApp();

// ---------------------------------------------------------------
// React
// ---------------------------------------------------------------

require('@/react/index');
require('@/react_fc/index');




