// firebase
// https://www.npmjs.com/package/firebase
// https://firebase.google.com/docs/reference/js/firebase.database?hl=ja

export default class getDatabase {

  constructor(firebase) {

    this.firebase = firebase;
    this.db = this.firebase.firestore();
    this.db.enablePersistence({ synchronizeTabs: true }).then(() => {
      console.log('マルチタブでオフラインデータが使えるからindexDBで保存される');
    });    

    // event
    this.event();

  }

  event() {

    let template = document.querySelector('#likedata');

    if (template) {

      // // ========== EX : firebase : firestore ==========
      let wrap = document.querySelector('.js-likelist');      
      this.db.collection('moomins').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // console.log(`${doc.id} => ${doc.data()}`);
              let key = doc.id;
              var docRef = this.db.collection('moomins').doc(key).collection('vote');
              docRef.get().then((querySnapshot) => {
                  let childData = querySnapshot.size;
                  console.log(key, childData);

                  let clone = document.importNode(template.content, true);
                  let a = clone.querySelector('a');
                  let img = clone.querySelector('img');
                  let span = clone.querySelector('span');
                  a.dataset.id = key;
                  span.textContent = childData;
                  img.src = '/common/img/thumb/thumb-sample-' + key.replace('item', '') + '.jpg';
                  wrap.appendChild(clone);

                  a.onclick = (e)=> {
                    e.preventDefault();
                    this.likeplus(e.currentTarget.dataset.id, parseInt(e.currentTarget.innerText) + 1);
                    return false;
                  };
              });
          });
      });

      // // ========== EX : firebase : real time database ==========
      // let wrap = document.querySelector('.js-likelist');
      // let query = this.firebase.database().ref('moomins').orderByKey();
      // query.once('value')
      //   .then( (snapshot)=> {
      //     snapshot.forEach( (childSnapshot)=> {
      //       let key = childSnapshot.key;
      //       let childData = childSnapshot.numChildren();
      //       console.log(key, childData);
      //       let clone = document.importNode(template.content, true);
      //       let a = clone.querySelector('a');
      //       let img = clone.querySelector('img');
      //       let span = clone.querySelector('span');
      //       a.dataset.id = key;
      //       span.textContent = childData;
      //       img.src = '/common/img/thumb/thumb-sample-' + key.replace('item', '') + '.jpg';
      //       wrap.appendChild(clone);
      //       a.onclick = (e)=> {
      //         e.preventDefault();
      //         this.likeplus(e.currentTarget.dataset.id, parseInt(e.currentTarget.innerText) + 1);
      //         return false;
      //       };
      //   });
      // });

    }

  }

  likeplus(itemId, num) {

    this.db.collection('moomins').doc(itemId).collection('vote').add({}).then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        let button = document.querySelectorAll('.js-likelist a[data-id="' + itemId + '"] span');
        button[0].textContent = num;
    }).catch(function(error) {
        console.error('Error adding document: ', error);
    });

    // // ========== EX : firebase : real time database ==========
    // this.firebase.database().ref('moomins/' + itemId).push({'likeaaa': num});
    // let button = document.querySelectorAll('.js-likelist a[data-id="' + itemId + '"] span');
    // button[0].textContent = num;

  }

}