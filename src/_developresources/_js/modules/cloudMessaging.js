// cloud messaging
// オンラインだった時にクラスをactiveにする

export default class cloudMessaging {

  constructor(firebase) {

    this.firebase = firebase;
    this.messaging = this.firebase.messaging();
    this.messaging.usePublicVapidKey('BMm3rmg4Ms3Tmxy8WBRueeLTzxg6Tftzn9EAiVIQbc8UhcjimK0LUWVSKLBAutFz9qMXj9s_dAD8rh38aabRDkA');

    this.init();

  }

  init() {
    // 通知の受信許可をリクエストする
    this.messaging.requestPermission().then(() => {
        console.log('Notification permission granted.');
     
        // 現在の登録トークンの取得
        this.messaging.getToken().then((token) => {
            this.sendTokenToServer(token);
            console.log('token', token);
        });
     
        // トークン更新のモニタリング
        this.messaging.onTokenRefresh(() => {
            this.messaging.getToken().then((refreshedToken) => {
                console.log('Token refreshed.', refreshedToken);
            }).catch((err) => {
                console.log('Unable to retrieve refreshed token ', err);
            });
        });
    }).catch((err) => {
        console.log('Unable to get permission to notify.', err);
    });
  }

}