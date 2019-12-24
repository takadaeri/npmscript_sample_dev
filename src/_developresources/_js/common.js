// modules
import setSns from '@/modules/setSns';
setSns({
  url: 'https://www.google.com/',
  tw: '.tw',
  fb: '.fb',
  line: '.line'
});

import getBook from '@/modules/getBook';
getBook();

// import getDatabase from '@/modules/getDatabase';
// new getDatabase();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js?1925').then(
            registration => {
                console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
            },
            error => {
                console.log(`ServiceWorker registration failed: ${error}`);
            }
        );
    });
}