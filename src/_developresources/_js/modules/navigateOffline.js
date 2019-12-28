// online offline
// オンラインだった時にクラスをactiveにする

export default class navigateOffline {

  constructor(el) {
    this.target = el;
    this.event();
  }

  event() {
    this.checkOnline();
    window.addEventListener('online', this.checkOnline());
    window.addEventListener('offline', this.checkOnline());

    this.target.onclick = ()=> {
      this.deleteRegister();
    };
  }

  checkOnline() {
    let online = navigator.onLine;
    console.log(online);
    if(online) {
      this.viewOnline();
    }else{
      this.viewOffline();
    }
  }

  viewOnline() {
    this.target.classList.add('is-active');
  }

  viewOffline() {
    this.target.classList.remove('is-active');
  }

  deleteRegister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('Registration succeeded.');
        registration.unregister().then(function(boolean) {
          console.log(boolean);
        });
      }).catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
  }

}
