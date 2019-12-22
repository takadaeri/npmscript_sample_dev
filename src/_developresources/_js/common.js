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


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js?1900').then(
            registration => {
                console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
            },
            error => {
                console.log(`ServiceWorker registration failed: ${error}`);
            }
        );
    });
}