/**
 * firebase
 * https://www.npmjs.com/package/firebase
 * https://firebase.google.com/docs/reference/js/firebase.database?hl=ja
 * 
 */

// import * as firebase from 'firebase';

export default class getDatabase {

  constructor() {
    
    let config = {
      apiKey: 'AIzaSyAqT7aqDkWakeIwh_VrqPDhWt2xjF9A5_A',
      authDomain: 'sampledev-15072.firebaseapp.com',
      databaseURL: 'https://sampledev-15072.firebaseio.com',
      projectId: 'sampledev-15072',
      storageBucket: 'sampledev-15072.appspot.com',
      messagingSenderId: '805023177198',
      appId: '1:805023177198:web:bffebc603d6911aa9696ff',
      measurementId: 'G-VJ23V006HL'
    };
    firebase.initializeApp(config);
    firebase.analytics();

    // event
    this.event();

  }

  event() {

    let template = document.querySelector('#likedata');

    if (template) {
      let wrap = document.querySelector('.js-likelist');

      let query = firebase.database().ref('moomins').orderByKey();
      query.once('value')
        .then( (snapshot)=> {
          snapshot.forEach( (childSnapshot)=> {
            
            let key = childSnapshot.key;
            let childData = childSnapshot.val();
            console.log(key, childData);

            let clone = document.importNode(template.content, true);
            let a = clone.querySelector('a');
            let img = clone.querySelector('img');
            let span = clone.querySelector('span');
            a.dataset.id = key;
            span.textContent = childData.like;
            img.src = '/common/img/thumb/' + childData.filename;
            wrap.appendChild(clone);

            a.onclick = (e)=> {
              e.preventDefault();
              this.likeplus(e.currentTarget.dataset.id, parseInt(e.currentTarget.innerText) + 1);
              return false;
            };

        });
      });

    }

  }

  likeplus(itemId, num) {

    firebase.database().ref('moomins/' + itemId).update({'like': num});
    let button = document.querySelectorAll('.js-likelist a[data-id="' + itemId + '"] span');
    button[0].textContent = num;

  }



}